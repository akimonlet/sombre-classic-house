import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { runInNewContext, Script } from "node:vm";

const SYSTEM_ID = "sombre-classic-house";
const moduleURL = new URL("../module/les-jours-heureux.mjs", import.meta.url);
const snapshot = value => JSON.stringify(value);
const plain = value => JSON.parse(snapshot(value));
const portrait = id => `systems/${SYSTEM_ID}/assets/scenarios/les-jours-heureux/portraits/${id}.webp`;
const applyPatch = (target, changes) => {
  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split(".");
    const key = keys.pop();
    const parent = keys.reduce((object, part) => object[part] ??= {}, target);
    parent[key] = structuredClone(value);
  }
};

// Only the Foundry boundary is mocked. Every setup evaluates the real module in
// an independent client VM, including its globals and module-local guards.
async function setup({ isGM = true, userId = "gm-primary", headerActions = true,
  actors = [], folders = [], scenes = [], users = { activeGM: { id: "gm-primary" } } } = {}) {
  const hooks = new Map(), buttons = [], dialogs = [], notifications = [];
  const game = { user: { id: userId, isGM }, users, actors, folders, scenes };
  const Folder = { create: async data => {
    await Promise.resolve();
    const folder = { ...structuredClone(data), id: `folder-${folders.length}` };
    folders.push(folder);
    return folder;
  } };
  const Actor = { createDocuments: async data => {
    await Promise.resolve();
    const created = data.map((entry, index) => ({ ...structuredClone(entry), id: `actor-${actors.length + index}` }));
    for (const actor of created) {
      actor.getFlag = (scope, key) => actor.flags?.[scope]?.[key];
      actor.update = () => assert.fail("Creation must preserve existing actors");
      actors.push(actor);
    }
    return created;
  } };
  const boundary = {
    Hooks: { on: (name, callback) => hooks.set(name, [...(hooks.get(name) ?? []), callback]) },
    game, Actor, Folder,
    CONST: { DOCUMENT_OWNERSHIP_LEVELS: { NONE: 0 }, TOKEN_DISPLAY_MODES: { ALWAYS: 50 } },
    ui: { notifications: Object.fromEntries(["info", "warn", "error"].map(level =>
      [level, message => notifications.push({ level, message })])) },
    Dialog: class {
      constructor(data) { this.data = data; }
      render(force) { assert.equal(force, true); dialogs.push(this.data); return this; }
    },
    $: markup => ({ markup, on(event, callback) { assert.equal(event, "click"); this.click = callback; } })
  };
  const target = { length: 1, append: button => buttons.push(button) };
  const html = { find: selector => {
    if (selector.startsWith("[data-")) {
      return { length: buttons.filter(button => button.markup.includes(selector.slice(1, -1))).length };
    }
    if (selector === ".directory-header .header-actions") return headerActions ? target : { length: 0 };
    if (selector === ".directory-header") return target;
    throw new Error(`Unexpected selector: ${selector}`);
  } };
  const source = await readFile(moduleURL, "utf8").catch(error => {
    if (error.code === "ENOENT") return "";
    throw error;
  });
  assert.match(source, /export const registerLesJoursHeureuxGenerator/, "Optional scenario generator exists");
  const generator = runInNewContext(
    `${source.replace("export const registerLesJoursHeureuxGenerator", "const registerLesJoursHeureuxGenerator")}\n({ registerLesJoursHeureuxGenerator });`, boundary
  );
  generator.registerLesJoursHeureuxGenerator();
  return { game, Actor, Folder, hooks, buttons, dialogs, notifications, actors, folders, scenes, boundary,
    render: () => (hooks.get("renderActorDirectory") ?? []).forEach(callback => callback({}, html)) };
}

function openDialog(host) {
  host.render();
  host.buttons.find(button => button.markup.includes("data-create-les-jours-heureux")).click();
  return host.dialogs.at(-1);
}

const checkbox = checked => ({ find(selector) {
  assert.equal(selector, '[name="includeSuzanne"]');
  return { prop(name) { assert.equal(name, "checked"); return checked; } };
} });

function action(host, name) {
  const callback = openDialog(host).buttons[name]?.callback;
  assert.equal(typeof callback, "function", `Explicit ${name} action exists`);
  return callback;
}

test("explicit monster creation adds a rollable antagonist with circular linked token without touching PCs", async () => {
  const host = await setup();
  await action(host, "create")();
  const pcs = snapshot(host.actors);
  await action(host, "monster")();
  const monster = host.actors.find(a => a.getFlag(SYSTEM_ID, "lesJoursHeureuxId") === "patiente");
  assert.ok(monster, "La Patiente must be an actor, not merely an image link");
  assert.equal(snapshot(host.actors.slice(0, 4)), pcs);
  assert.equal(host.actors.length, 5);
  assert.equal(monster.type, "victime");
  assert.equal(monster.name, "La Patiente");
  assert.equal(monster.system.isAntagonist, true);
  assert.deepEqual(monster.system.resources, {body:{value:12,max:12},spirit:{value:12,max:12},adrenaline:{value:0,max:3}});
  assert.equal(monster.prototypeToken.actorLink, true);
  assert.ok(monster.img.endsWith('/creatures/patiente.webp'));
  assert.ok(monster.prototypeToken.texture.src.endsWith('/creatures/patiente-token.webp'));
  assert.equal(monster.prototypeToken.disposition, -1);
  assert.equal(monster.prototypeToken.displayName, 0);
  assert.deepEqual(monster.ownership, {default:0});
  const folder = host.folders.find(f => f.id === monster.folder);
  assert.equal(folder.name, '2. Antagonistes');
  assert.equal(folder.folder, host.folders.find(f => f.name === 'Les jours heureux').id);
  monster.system.resources.body.value = 7;
  monster.system.gmNotes = 'Notes MJ en cours';
  const retained = snapshot(host.actors);
  await action(host, "monster")();
  assert.equal(snapshot(host.actors), retained);
});

test("monster creation is GM-only, serialized and can retry a failed write", async () => {
  const actors = [], folders = [], users = {activeGM:{id:'gm-primary'}};
  const host = await setup({actors,folders,users});
  const other = await setup({actors,folders,users,userId:'gm-secondary'});
  const create = action(host, 'monster');
  const denied = action(other, 'monster');
  await denied();
  assert.equal(actors.length, 0);
  host.game.user.isGM = false;
  await create();
  assert.equal(folders.length, 0);
  host.game.user.isGM = true;
  const original = host.Actor.createDocuments;
  host.Actor.createDocuments = async () => {throw new Error('storage unavailable')};
  await create();
  assert.equal(host.notifications.at(-1).level, 'error');
  host.Actor.createDocuments = original;
  await Promise.all([create(),create(),denied()]);
  assert.equal(actors.length, 1);
  assert.equal(folders.length, 3);
  const kept = snapshot(actors);
  await action(host, 'portraits')();
  assert.equal(snapshot(actors), kept, 'PC portrait action must not replace the circular monster token');
});

test("created monster executes the real sheet Corps, Esprit and attack handlers", async () => {
  const host = await setup();
  await action(host, 'monster')();
  const actor = host.actors[0];
  const messages = [], formulas = [];
  class Roll {
    constructor(formula) {this.formula = formula; formulas.push(formula);}
    async evaluate() {this.total = this.formula === '1d20' ? 6 : 3; return this;}
    async toMessage(data) {messages.push(data);}
  }
  const source = await readFile(new URL('../module/actor-sheet.mjs', import.meta.url), 'utf8');
  const method = source.slice(source.indexOf('  async _onRoll(event)'), source.lastIndexOf('\n}'));
  const sheet = runInNewContext(`({${method}})`, {Roll,ChatMessage:{getSpeaker:({actor})=>({actor:actor.id}),create:async data=>messages.push(data)},CONFIG:{sounds:{dice:'dice'}}});
  sheet.actor = actor;
  for (const [roll,ability] of [['test','body'],['test','spirit'],['attack','body']]) {
    await sheet._onRoll({preventDefault(){},currentTarget:{dataset:{roll,ability}}});
  }
  assert.deepEqual(formulas, ['1d20','1d20','1d20','1d6']);
  assert.equal(messages.length, 3);
  for (const message of messages) {
    assert.equal(message.speaker.actor, actor.id);
    assert.match(message.flavor, /La Patiente/);
    assert.match(message.flavor, /6 sous 12/);
    assert.match(message.flavor, /réussite/);
  }
  assert.match(messages[2].flavor, /3 Blessures/);
});

const expectedCharacters = [
  ["rene", "René Vautrin", "René Marchand", 7, 5, "représentant en aspirateurs", "Vous remarquez immédiatement lorsqu’on évite de répondre à une question.", "cigarette écrasée"],
  ["madeleine", "Madeleine Aubry", "Madeleine Perrin", 5, 7, "photographe de mariages", "Vous regardez spontanément les visages, les fenêtres et les reflets.", "viseur d’un appareil"],
  ["lucien", "Lucien Morel", "Lucien Bernard", 8, 4, "horloger", "Le mécanisme de la porte vous paraît compréhensible, même si vous ignorez pourquoi.", "odeur d’eau stagnante"],
  ["suzanne", "Suzanne Mercier", "Suzanne Delcourt", 4, 8, "comptable", "Vous examinez machinalement les dates, les noms et les signatures.", "faute de frappe répétée"]
];

test("confirmed creation produces four amnesiac PCs with imposed identities and intentional house stats", async () => {
  const host = await setup();
  await action(host, "create")();
  assert.equal(host.actors.length, 4);
  assert.equal(host.folders.length, 3);
  const root = host.folders.find(folder => folder.name === "Scénarios personnalisés");
  const scenario = host.folders.find(folder => folder.name === "Les jours heureux");
  const pcs = host.folders.find(folder => folder.name === "1. Personnages Joueurs");
  assert.equal(root.folder, null);
  assert.equal(scenario.folder, root.id);
  assert.equal(pcs.folder, scenario.id);
  for (const [id, name, trueName, body, spirit, fakeRole, familiar, flash] of expectedCharacters) {
    const actor = host.actors.find(a => a.getFlag(SYSTEM_ID, "lesJoursHeureuxId") === id);
    assert.ok(actor, id);
    assert.equal(actor.name, name);
    assert.equal(actor.type, "victime");
    assert.equal(actor.folder, pcs.id);
    assert.deepEqual(actor.ownership, { default: 0 });
    assert.deepEqual(actor.flags, { [SYSTEM_ID]: { lesJoursHeureuxId: id } });
    const system = actor.system;
    assert.equal(system.profession, "Patient amnésique");
    assert.equal(system.scenarioId, "les-jours-heureux");
    assert.equal(system.playerName, "");
    assert.equal(system.isAntagonist, false);
    assert.equal(system.nameRandomLocked, true);
    assert.equal(system.professionRandomLocked, true);
    assert.deepEqual(system.resources, {
      body: { value: body, max: 12 }, spirit: { value: spirit, max: 12 }, adrenaline: { value: 0, max: 3 }
    });
    assert.ok(system.background.startsWith("Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir.\n\n"));
    assert.ok(system.background.includes(fakeRole));
    assert.ok(system.background.endsWith(familiar));
    assert.equal(system.equipment, "Chemise de coton et chaussons de l’hôpital.");
    assert.ok(system.gmNotes.includes(trueName));
    assert.ok(system.gmNotes.includes(flash));
    assert.match(system.gmNotes, /plusieurs jours/i);
    assert.match(system.gmNotes, /incomplet/i);
    assert.match(system.gmNotes, /Moreau/);
    const publicData = JSON.stringify({ ...actor, system: { ...system, gmNotes: undefined } });
    for (const [, , secretName] of expectedCharacters) assert.ok(!publicData.includes(secretName));
    assert.doesNotMatch(publicData, /détective|enquêtrice|enquêteur|ancien inspecteur|La Patiente|Delmas|sacrifice|flashback/i);
    assert.equal(system.personality, 0);
    for (const field of ["advantage", "advantageDescription", "disadvantage", "disadvantageDescription", "positiveLink", "specialCard", "secret", "secretKind"]) assert.equal(system[field], "");
    for (const prefix of ["personality", "advantage", "disadvantage", "traits"]) {
      assert.equal(system[`${prefix}RandomUsed`], false);
      assert.equal(system[`${prefix}RandomLocked`], false);
    }
    for (const field of ["adrenalinePending", "specialUsed", "infected"]) assert.equal(system[field], false);
    assert.equal(actor.img, portrait(id));
    assert.equal(actor.prototypeToken.texture.src, portrait(id));
    assert.equal(actor.prototypeToken.name, name);
    assert.equal(actor.prototypeToken.actorLink, true);
    assert.equal(actor.prototypeToken.displayName, 50);
  }
  assert.equal(host.scenes.length, 0);
});

test("unchecked Suzanne creates three PCs and a later checked run only adds the optional sheet", async () => {
  const host = await setup();
  const create = action(host, "create");
  await create(checkbox(false));
  assert.deepEqual(host.actors.map(a => a.getFlag(SYSTEM_ID, "lesJoursHeureuxId")), ["rene", "madeleine", "lucien"]);
  const retained = snapshot(host.actors);
  await create(checkbox(true));
  assert.equal(host.actors.length, 4);
  assert.equal(snapshot(host.actors.slice(0, 3)), retained);
  const all = snapshot(host.actors);
  await create(checkbox(false));
  assert.equal(snapshot(host.actors), all, "Changing attendance never deletes a prepared Suzanne");
  assert.equal(host.folders.length, 3);
});

test("concurrent confirmations from independent GM clients designate one writer and avoid duplicate folders or actors", async () => {
  const actors = [], folders = [];
  const users = { activeGM: { id: "gm-primary" } };
  const primary = await setup({ actors, folders, users });
  const secondary = await setup({ actors, folders, users, userId: "gm-secondary" });
  const first = action(primary, "create"), second = action(primary, "create");
  const other = action(secondary, "create");
  await Promise.all([other(), first(), second(), first(), other()]);
  assert.equal(actors.length, 4);
  assert.equal(new Set(actors.map(a => a.getFlag(SYSTEM_ID, "lesJoursHeureuxId"))).size, 4);
  assert.equal(folders.length, 3);
  assert.equal(new Set(folders.map(f => `${f.folder}/${f.name}`)).size, 3);
  assert.equal(primary.notifications.filter(n => n.level === "error").length, 0);
  assert.equal(secondary.notifications.length, 2);
  assert.ok(secondary.notifications.every(n => n.level === "warn" && /MJ actif désigné/.test(n.message)));
});

test("partial storage failures notify and release the guard for a preserving retry", async t => {
  for (const failure of ["folder", "partial-actor"]) await t.test(failure, async () => {
    const host = await setup();
    const create = action(host, "create");
    const originalFolder = host.Folder.create;
    const originalActor = host.Actor.createDocuments;
    if (failure === "folder") host.Folder.create = async data => {
      if (host.folders.length) throw new Error("Folder storage failure");
      return originalFolder(data);
    };
    else host.Actor.createDocuments = async data => {
      await originalActor(data.slice(0, 2));
      throw new Error("Actor storage failure");
    };
    await assert.doesNotReject(create);
    assert.equal(host.notifications.at(-1).level, "error");
    assert.match(host.notifications.at(-1).message, /storage failure/);
    const retained = snapshot(host.actors);
    const count = host.actors.length;
    host.Folder.create = originalFolder;
    host.Actor.createDocuments = originalActor;
    await create();
    assert.equal(snapshot(host.actors.slice(0, count)), retained);
    assert.equal(host.actors.length, 4);
    assert.equal(host.folders.length, 3);
    assert.equal(host.notifications.at(-1).level, "info");
    await create();
    assert.equal(host.actors.length, 4);
    assert.match(host.notifications.at(-1).message, /conservées/);
  });
});

test("portrait action changes only flagged actor and linked or unlinked scene-token images", async () => {
  const host = await setup();
  await action(host, "create")();
  const actorWrites = [], tokenWrites = [];
  for (const actor of host.actors) {
    actor.img = "custom.webp";
    actor.prototypeToken.texture = { src: "custom-token.webp", scaleX: 0.7, tint: "#abcdef" };
    actor.system.resources.body.value = 1;
    actor.system.background = "Player edits";
    actor.system.gmNotes = "GM progress";
    actor.ownership = { default: 1, player42: 3 };
    actor.update = async changes => {
      await Promise.resolve();
      actorWrites.push(plain(changes));
      applyPatch(actor, changes);
    };
  }
  for (const id of [undefined, "unknown", "toString", "__proto__"]) {
    host.actors.push({ id: `other-${id}`, name: "René Vautrin", img: "keep.webp",
      getFlag: () => id, update: () => assert.fail("Unrelated actor must not be changed") });
  }
  host.actors.push({ id: "another-scenario", name: "René Vautrin", img: "keep.webp",
    getFlag: (scope, key) => scope === SYSTEM_ID && key === "unMeurtreDeTropId" ? "rene" : undefined,
    update: () => assert.fail("The same character ID in another scenario must not match") });
  for (const actorLink of [true, false]) {
    const tokens = host.actors.map((actor, i) => ({
      id: `${actorLink}-${i}`, actorId: actor.id, actorLink, name: "Custom token", x: 123, y: 456,
      width: 2, height: 3, texture: { src: "old.svg", scaleX: 0.8, scaleY: 1.2, tint: "#aabbcc" },
      delta: { system: { resources: { body: { value: 1 } } } }, flags: { custom: true }
    }));
    tokens.push({ id: "no-actor", actorId: null, texture: { src: "keep.svg" } });
    host.scenes.push({ tokens, updateEmbeddedDocuments: async (type, changes) => {
      assert.equal(type, "Token");
      tokenWrites.push(plain(changes));
      for (const change of changes) {
        assert.deepEqual(Object.keys(change).sort(), ["_id", "texture.src"]);
        applyPatch(tokens.find(token => token.id === change._id), { "texture.src": change["texture.src"] });
      }
    } });
  }
  const expectedActors = plain(host.actors), expectedScenes = plain(host.scenes);
  for (const [index, [id]] of expectedCharacters.entries()) {
    expectedActors[index].img = portrait(id);
    expectedActors[index].prototypeToken.texture.src = portrait(id);
    for (const scene of expectedScenes) scene.tokens[index].texture.src = portrait(id);
  }
  const apply = action(host, "portraits");
  assert.equal(actorWrites.length, 0, "Opening dialog is not consent to change images");
  await apply();
  assert.equal(actorWrites.length, 4);
  assert.equal(tokenWrites.length, 2);
  for (const changes of actorWrites) assert.deepEqual(Object.keys(changes).sort(), ["img", "prototypeToken.texture.src"]);
  assert.equal(snapshot(host.actors), snapshot(expectedActors));
  assert.equal(snapshot(host.scenes), snapshot(expectedScenes));
  await apply();
  assert.equal(actorWrites.length, 4, "Correct images perform no redundant actor writes");
  assert.equal(tokenWrites.length, 2, "Correct images perform no redundant token writes");
});

test("loss of active GM while awaiting a write prevents subsequent mutations", async t => {
  for (const phase of ["first-folder", "last-folder", "portrait", "scene"]) await t.test(phase, async () => {
    const host = await setup();
    const create = action(host, "create");
    if (phase.endsWith("folder")) {
      const original = host.Folder.create;
      host.Folder.create = async data => {
        const folder = await original(data);
        if (phase === "first-folder" || host.folders.length === 3) host.game.users.activeGM = { id: "gm-secondary" };
        return folder;
      };
      await create();
      assert.equal(host.folders.length, phase === "first-folder" ? 1 : 3);
      assert.equal(host.actors.length, 0);
    } else {
      await create();
      let actorWrites = 0, sceneWrites = 0;
      for (const actor of host.actors) {
        if (phase === "portrait") actor.img = "old.webp";
        actor.update = async changes => {
          actorWrites++;
          applyPatch(actor, changes);
          host.game.users.activeGM = { id: "gm-secondary" };
        };
      }
      for (let i = 0; i < 2; i++) host.scenes.push({
        tokens: [{ id: `token-${i}`, actorId: host.actors[0].id, texture: { src: "old.webp" } }],
        updateEmbeddedDocuments: async () => { sceneWrites++; host.game.user.isGM = false; }
      });
      await action(host, "portraits")();
      assert.equal(actorWrites, phase === "portrait" ? 1 : 0);
      assert.equal(sceneWrites, phase === "scene" ? 1 : 0);
    }
    assert.equal(host.notifications.at(-1).level, "error");
    assert.match(host.notifications.at(-1).message, /MJ actif|permission/);
  });
});

test("system init registers the optional scenario without creating any world documents", async () => {
  const host = await setup();
  host.hooks.clear();
  Object.assign(globalThis, host.boundary);
  globalThis.foundry = { data: { fields: {} }, abstract: { TypeDataModel: class {} } };
  globalThis.ActorSheet = class { async getData() { return {}; } };
  globalThis.Application = class {};
  globalThis.CONFIG = { Actor: {} };
  globalThis.Actors = { registerSheet() {}, unregisterSheet() {} };
  host.game.settings = { register() {} };
  const once = new Map();
  host.boundary.Hooks.once = (name, callback) => once.set(name, callback);
  await import(new URL("../sombre-classic.mjs?les-jours-heureux-test", import.meta.url));
  assert.equal(host.hooks.size, 0);
  once.get("init")();
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
  assert.equal(host.dialogs.length, 0);
  host.render();
  assert.equal(host.buttons.filter(button => button.markup.includes("data-create-les-jours-heureux")).length, 1);
  assert.equal(host.buttons.filter(button => button.markup.includes("data-create-un-meurtre-de-trop")).length, 1);
  assert.equal(host.actors.length, 0);
});

test("actor sheet labels Les jours heureux and leaves the character choices available", async () => {
  const host = await setup();
  await action(host, "create")();
  globalThis.ActorSheet = class { async getData() { return {}; } };
  globalThis.game = host.game;
  const { SombreActorSheet } = await import(new URL("../module/actor-sheet.mjs?les-jours-heureux-label", import.meta.url));
  const sheet = new SombreActorSheet();
  sheet.actor = host.actors[0];
  sheet.isEditable = true;
  let context = await sheet.getData();
  assert.equal(context.scenarioLabel, "Sombre Classic · Les jours heureux");
  assert.equal(context.bodyGauge.length, 13);
  assert.equal(context.spiritGauge.length, 13);
  assert.equal(context.isHouse, false);
  host.game.user.isGM = false;
  context = await sheet.getData();
  assert.equal(context.isGM, false);
  assert.equal(context.hasSecret, false);
  assert.equal(context.canRandomizeName, false);
  assert.equal(context.canRandomizeProfession, false);
  assert.equal(context.canChoosePersonality, true);
  assert.equal(context.canChooseAdvantage, true);
  assert.equal(context.canChooseDisadvantage, true);
});

test("reruns preserve complete edited actor state and recreate only a missing stable ID", async () => {
  const host = await setup();
  const create = action(host, "create");
  await create();
  const first = host.actors[0];
  Object.assign(first, { name: "Edited name", folder: "moved-folder", ownership: { default: 1, player42: 3 }, img: "edited.webp" });
  first.system.resources.body = { value: 2, max: 15 };
  first.system.resources.spirit.value = 3;
  first.system.resources.adrenaline.value = 2;
  Object.assign(first.system, { background: "Revealed by the player", gmNotes: "GM progress", equipment: "Acquired in play", personality: 14,
    advantage: "Fort", disadvantage: "Fragile", personalityRandomUsed: true, secret: "Later secret" });
  first.prototypeToken.texture.src = "edited-token.webp";
  first.flags.external = { preserve: true };
  const original = host.Actor.createDocuments;
  const allActors = snapshot(host.actors);
  const allFolders = snapshot(host.folders);
  host.Actor.createDocuments = () => assert.fail("A complete roster must perform no actor write");
  await create();
  await create(checkbox(false));
  assert.equal(snapshot(host.actors), allActors);
  assert.equal(snapshot(host.folders), allFolders);
  assert.equal(host.notifications.filter(n => n.level === "error").length, 0);
  host.actors.splice(2, 1);
  const retained = snapshot(host.actors);
  host.Actor.createDocuments = original;
  for (const folder of host.folders) if (typeof folder.folder === "string") folder.folder = { id: folder.folder };
  await create();
  assert.equal(snapshot(host.actors.slice(0, 3)), retained);
  assert.equal(host.actors.at(-1).getFlag(SYSTEM_ID, "lesJoursHeureuxId"), "lucien");
  assert.equal(host.folders.length, 3);
  assert.match(host.notifications.at(-1).message, /1 fiches créées/);
});

test("namesakes and same-named folders in other types or parents cannot suppress scenario creation", async () => {
  const actors = [{ id: "namesake", name: "René Vautrin", getFlag: () => undefined }];
  const folders = [
    { id: "journal-root", name: "Scénarios personnalisés", type: "JournalEntry", folder: null },
    { id: "other-scenario", name: "Les jours heureux", type: "Actor", folder: "unrelated-parent" },
    { id: "other-pcs", name: "1. Personnages Joueurs", type: "Actor", folder: "other-scenario" }
  ];
  const before = snapshot({ actors, folders });
  const host = await setup({ actors, folders });
  await action(host, "create")();
  assert.equal(snapshot({ actors: actors.slice(0, 1), folders: folders.slice(0, 3) }), before);
  assert.equal(actors.length, 5);
  assert.equal(folders.length, 6);
  assert.ok(actors.slice(1).every(actor => actor.folder !== "other-pcs"));
});

test("all actions recheck stale dialogs for non-GM, secondary GM and absent activeGM", async t => {
  for (const mode of ["player", "secondary", "undefined", "null", "no-users"]) await t.test(mode, async () => {
    const host = await setup();
    await action(host, "create")();
    const create = action(host, "create"), apply = action(host, "portraits");
    const first = host.actors[0];
    first.img = "old.webp";
    host.actors.pop();
    first.update = () => assert.fail("Unauthorized actor update");
    host.scenes.push({ tokens: [{ actorId: first.id, texture: { src: "old.webp" } }],
      updateEmbeddedDocuments: () => assert.fail("Unauthorized token update") });
    host.Actor.createDocuments = () => assert.fail("Unauthorized actor creation");
    host.Folder.create = () => assert.fail("Unauthorized folder creation");
    const before = snapshot({ actors: host.actors, scenes: host.scenes, folders: host.folders });
    host.notifications.length = 0;
    if (mode === "player") host.game.user.isGM = false;
    else if (mode === "no-users") delete host.game.users;
    else host.game.users.activeGM = mode === "secondary" ? { id: "gm-secondary" } : mode === "null" ? null : undefined;
    await create(); await apply();
    assert.equal(snapshot({ actors: host.actors, scenes: host.scenes, folders: host.folders }), before);
    assert.equal(host.notifications.length, mode === "player" ? 0 : 2);
    assert.ok(host.notifications.every(n => n.level === "warn"));
  });
});

test("portrait concurrency across independent GM clients and local dialogs performs each write once", async () => {
  const actors = [], folders = [], scenes = [];
  const users = { activeGM: { id: "gm-primary" } };
  const primary = await setup({ actors, folders, scenes, users });
  await action(primary, "create")();
  const other = await setup({ actors, folders, scenes, users, userId: "gm-secondary" });
  let writes = 0;
  for (const actor of actors) {
    actor.img = "old.webp";
    actor.update = async changes => { writes++; await Promise.resolve(); applyPatch(actor, changes); };
  }
  const apply1 = action(primary, "portraits"), apply2 = action(primary, "portraits");
  const applyOther = action(other, "portraits");
  await Promise.all([applyOther(), apply1(), apply2(), apply1()]);
  assert.equal(writes, 4);
  assert.equal(other.notifications.at(-1).level, "warn");
});

test("creation and portrait updates share one local in-flight guard", async () => {
  const host = await setup();
  await action(host, "create")();
  const first = host.actors[0];
  first.img = "custom.webp";
  const create = action(host, "create"), apply = action(host, "portraits");
  first.update = async changes => { await create(); applyPatch(first, changes); };
  host.actors.pop();
  await apply();
  assert.equal(host.actors.length, 3, "Creation cannot overlap an image update");
  first.img = "custom-again.webp";
  const original = host.Actor.createDocuments;
  host.Actor.createDocuments = async data => { await apply(); return original(data); };
  await create();
  assert.equal(first.img, "custom-again.webp", "Image updates cannot overlap creation");
  assert.equal(host.actors.length, 4);
});

test("portrait storage failures release the guard and retries preserve completed changes", async t => {
  for (const failure of ["actor", "token"]) await t.test(failure, async () => {
    const host = await setup();
    await action(host, "create")();
    const first = host.actors[0];
    first.img = "old.webp";
    let fail = true, actorWrites = 0;
    first.update = async changes => {
      if (fail && failure === "actor") throw new Error("Portrait storage failure");
      actorWrites++; applyPatch(first, changes);
    };
    const token = { id: "token", actorId: first.id, texture: { src: "old.webp" }, x: 123 };
    host.scenes.push({ tokens: [token], updateEmbeddedDocuments: async (_type, changes) => {
      if (fail && failure === "token") throw new Error("Token storage failure");
      token.texture.src = changes[0]["texture.src"];
    } });
    const apply = action(host, "portraits");
    await assert.doesNotReject(apply);
    assert.equal(host.notifications.at(-1).level, "error");
    assert.match(host.notifications.at(-1).message, /storage failure/);
    fail = false;
    await apply();
    assert.equal(actorWrites, 1);
    assert.equal(first.img, portrait("rene"));
    assert.equal(token.texture.src, portrait("rene"));
    assert.equal(token.x, 123);
    assert.equal(host.notifications.at(-1).level, "info");
  });
});

const assetURL = new URL("../assets/scenarios/les-jours-heureux/", import.meta.url);

test("all menu URLs resolve to packaged assets with exactly four distinct optimized WebP portraits", async () => {
  const host = await setup();
  const dialog = openDialog(host);
  const links = [...dialog.content.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  assert.equal(links.length, 8);
  assert.ok(links.some(link => link.endsWith('/creatures/patiente.webp')));
  assert.ok(links.some(link => link.endsWith('/creatures/patiente-token.webp')));
  for (const link of links) {
    const file = new URL(`../${link.replace(`systems/${SYSTEM_ID}/`, "")}`, import.meta.url);
    assert.ok((await readFile(file)).length > 0, link);
  }
  const ids = expectedCharacters.map(([id]) => id);
  assert.deepEqual((await readdir(new URL("portraits/", assetURL))).sort(), ids.map(id => `${id}.webp`).sort());
  const hashes = new Set();
  for (const id of ids) {
    const bytes = await readFile(new URL(`portraits/${id}.webp`, assetURL));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.ok(bytes.length < 150_000, "Package only optimized portraits, not raw generations");
    hashes.add(createHash("sha256").update(bytes).digest("hex"));
    let dimensions;
    for (let offset = 12; offset + 8 <= bytes.length;) {
      const type = bytes.toString("ascii", offset, offset + 4);
      const size = bytes.readUInt32LE(offset + 4), start = offset + 8;
      if (type === "VP8X") dimensions = [bytes.readUIntLE(start + 4, 3) + 1, bytes.readUIntLE(start + 7, 3) + 1];
      if (type === "VP8 ") dimensions = [bytes.readUInt16LE(start + 6) & 0x3fff, bytes.readUInt16LE(start + 8) & 0x3fff];
      if (type === "VP8L") {
        const bits = bytes.readUInt32LE(start + 1);
        dimensions = [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
      }
      if (dimensions) break;
      offset = start + size + (size % 2);
    }
    assert.deepEqual(dimensions, [768, 1152], id);
  }
  assert.equal(hashes.size, 4, "Do not silently reuse a portrait for two characters");
});

test("public biographies and GM openings agree with the packaged conductor data", async () => {
  const html = await readFile(new URL("conducteur-les-jours-heureux.html", assetURL), "utf8");
  const json = html.match(/^const DATA\s*=\s*(\{.*\});?\s*$/m)?.[1];
  assert.ok(json, "Packaged conductor contains its scenario data");
  const data = JSON.parse(json);
  assert.ok(data.rooms.every(room => room.facts.every(fact => !fact.includes("vient de subir sa première nuit"))),
    "Repeated awakenings must not be contradicted by a first-night room note");
  const host = await setup();
  await action(host, "create")();
  assert.equal(data.characters.length, 4);
  assert.deepEqual(data.characters.map(c => c.id).sort(), expectedCharacters.map(([id]) => id).sort());
  for (const character of data.characters) {
    const actor = host.actors.find(a => a.getFlag(SYSTEM_ID, "lesJoursHeureuxId") === character.id);
    assert.equal(actor.name, character.false_name);
    assert.equal(actor.system.background, `Ce que l’infirmière vous affirme. Vous n’en avez aucun souvenir.\n\n${character.fake}\n\n${character.familiar}`);
    assert.equal(actor.system.resources.body.value, character.stats.corps);
    assert.equal(actor.system.resources.spirit.value, character.stats.esprit);
    for (const key of ["true_name", "role", "real", "opening", "nurse", "line", "reaction"]) {
      assert.ok(actor.system.gmNotes.includes(character[key]), `${character.id}: ${key} belongs only in GM notes`);
    }
  }
  for (const [,script] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    assert.doesNotThrow(() => new Script(script), "Packaged inline JS parses");
  }
});

test("packaged player map contains architecture but no GM data or hidden identities", async () => {
  const html = await readFile(new URL("plan-joueurs-les-jours-heureux.html", assetURL), "utf8");
  assert.match(html, /Clinique des Ormes/);
  assert.match(html, /Chambre 1/);
  assert.match(html, /Chambre 4/);
  assert.match(html, /Salle commune/);
  assert.doesNotMatch(html, /const DATA|La Patiente|Delmas|BASEMENT_ROOMS|data-secret-map|data-monster|<script|data:image|file:\/\//i);
  for (const [, , trueName] of expectedCharacters) assert.ok(!html.includes(trueName));
});

test("directory and cancel-first dialog are opt-in, GM-only and safe after permission loss", async () => {
  const host = await setup({ isGM: false, headerActions: false });
  host.render();
  assert.equal(host.buttons.length, 0);
  host.game.user.isGM = true;
  host.render(); host.render();
  assert.equal(host.buttons.length, 1);
  assert.match(host.buttons[0].markup, /Les jours heureux/);
  host.game.user.isGM = false;
  host.buttons[0].click();
  assert.equal(host.dialogs.length, 0);
  host.game.user.isGM = true;
  const dialog = openDialog(host);
  assert.equal(dialog.default, "cancel");
  assert.match(dialog.content, /conducteur-les-jours-heureux\.html/);
  assert.match(dialog.content, /plan-joueurs-les-jours-heureux\.html/);
  assert.match(dialog.content, /name="includeSuzanne"[^>]*checked/);
  assert.match(dialog.content, /Suzanne.*optionnel/i);
  assert.match(dialog.content, /uniquement les images/i);
  for (const id of ["rene", "madeleine", "lucien", "suzanne"]) assert.ok(dialog.content.includes(`href="${portrait(id)}"`));
  await dialog.buttons.cancel.callback?.();
  await dialog.close?.();
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
  assert.equal(host.scenes.length, 0);
  host.game.user.isGM = false;
  for (const name of ["create", "portraits"]) {
    assert.equal(typeof dialog.buttons[name].callback, "function");
    await dialog.buttons[name].callback();
  }
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
});
