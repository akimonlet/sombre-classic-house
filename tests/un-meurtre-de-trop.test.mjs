import test from "node:test";
import assert from "node:assert/strict";

import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const moduleURL = new URL("../module/un-meurtre-de-trop.mjs", import.meta.url);
let instance = 0;

// Only the Foundry host boundary is mocked; the generator runs unchanged.
async function setup({ isGM = true, headerActions = true, userId = "gm-primary", actors = [], folders = [], scenes = [], isolated = false } = {}) {
  const hooks = new Map();
  const buttons = [];
  const dialogs = [];
  const notifications = [];
  globalThis.Hooks = { on: (name, callback) => hooks.set(name, callback) };
  const clientGame = globalThis.game = { user: { id: userId, isGM }, users: { activeGM: { id: "gm-primary" } }, actors, folders, scenes };
  globalThis.CONST = { DOCUMENT_OWNERSHIP_LEVELS: { NONE: 0 }, TOKEN_DISPLAY_MODES: { ALWAYS: 50 } };
  globalThis.ui = { notifications: Object.fromEntries(["info", "warn", "error"].map(level => [level, message => notifications.push({ level, message })])) };
  globalThis.Folder = { create: async data => {
    await Promise.resolve();
    const folder = { ...structuredClone(data), id: `folder-${folders.length}` };
    folders.push(folder);
    return folder;
  } };
  globalThis.Actor = { createDocuments: async data => {
    await Promise.resolve();
    const created = data.map((entry, index) => ({
      ...structuredClone(entry), id: `actor-${actors.length + index}`
    }));
    for (const actor of created) {
      actor.getFlag = (scope, key) => actor.flags?.[scope]?.[key];
      actor.update = () => assert.fail("Existing actors must retain their complete state");
      actors.push(actor);
    }
    return created;
  } };
  globalThis.Scene = { create: async data => {
    await Promise.resolve();
    const scene = { ...structuredClone(data), id: `scene-${scenes.length}` };
    scene.getFlag = (scope, key) => scene.flags?.[scope]?.[key];
    scene.update = () => assert.fail("Existing landing scenes must remain unchanged");
    scene.activate = () => assert.fail("Landing scenes must not be activated automatically");
    scenes.push(scene);
    return scene;
  } };
  globalThis.Dialog = class {
    constructor(data) { this.data = data; }
    render(force) { assert.equal(force, true); dialogs.push(this.data); return this; }
  };
  globalThis.$ = markup => ({
    markup,
    on(event, callback) { assert.equal(event, "click"); this.click = callback; }
  });
  const target = { length: 1, append: button => buttons.push(button) };
  const html = { find: selector => {
    if (selector === "[data-create-un-meurtre-de-trop]") return { length: buttons.length };
    if (selector === ".directory-header .header-actions") return headerActions ? target : { length: 0 };
    if (selector === ".directory-header") return target;
    throw new Error(`Unexpected selector: ${selector}`);
  } };
  // Separate browser globals and module-local guards, but the same world collections.
  // Strip only the export keyword to evaluate the unchanged generator in a fresh VM.
  const generator = isolated ? runInNewContext(
    `${(await readFile(moduleURL, "utf8")).replace("export const registerUnMeurtreDeTropGenerator", "const registerUnMeurtreDeTropGenerator")}\n({ registerUnMeurtreDeTropGenerator });`,
    { Hooks, game: clientGame, CONST, ui, Folder, Actor, Scene, Dialog, $ }
  ) : await import(`${moduleURL}?test=${++instance}`).catch(error => {
    if (error.code === "ERR_MODULE_NOT_FOUND") return {};
    throw error;
  });
  assert.equal(typeof generator.registerUnMeurtreDeTropGenerator, "function", "Optional generator registration exists");
  generator.registerUnMeurtreDeTropGenerator();
  return { hooks, buttons, dialogs, notifications, actors, folders, scenes, game: clientGame, render: () => hooks.get("renderActorDirectory")({}, html) };
}

test("directory registration is optional, GM-only and explicitly confirmed", async () => {
  const host = await setup();
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
  assert.equal(host.dialogs.length, 0);
  game.user.isGM = false;
  host.render();
  assert.equal(host.buttons.length, 0);
  game.user.isGM = true;
  host.render();
  host.render();
  assert.equal(host.buttons.length, 1);
  assert.match(host.buttons[0].markup, /Un meurtre de trop/);
  game.user.isGM = false;
  host.buttons[0].click();
  assert.equal(host.dialogs.length, 0, "Stale button checks current GM permission");
  game.user.isGM = true;
  host.buttons[0].click();
  assert.equal(host.dialogs.length, 1);
  const dialog = host.dialogs[0];
  assert.equal(dialog.default, "cancel");
  assert.equal(typeof dialog.buttons.create.callback, "function");
  assert.match(dialog.content, /conducteur-un-meurtre-de-trop\.html/);
  assert.match(dialog.content, /plan-joueurs-un-meurtre-de-trop\.html/);
  await dialog.buttons.cancel.callback?.();
  await dialog.close?.();
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
  game.user.isGM = false;
  await dialog.buttons.create.callback();
  assert.equal(host.actors.length, 0, "Confirmation rechecks current GM permission");
  assert.equal(host.folders.length, 0);
});

async function openConfirmation(host) {
  host.render();
  host.buttons[0].click();
  return host.dialogs.at(-1).buttons.create.callback;
}

const expectedCharacters = [
  ["rene", "René Valmont", "Ancien policier autoritaire", "PJ", /renversé du vin/, /baignoire/],
  ["jeanne", "Jeanne Vidal", "Détective méthodique", "PJ", /preuves des détournements de Céleste/, /classeur rouge/],
  ["malik", "Malik Serra", "Privé débrouillard", "PJ", /Octave vivant après le jeu/, /oie vivante/],
  ["diane", "Diane Vasseur", "Détective médiatique", "PJ", /argent pris à son père après le jeu/, /méridienne/],
  ["celeste", "Céleste Arnaud", "Secrétaire d’Octave", "PNJ", /coupe-papier/, /secrétaire/i],
  ["agathe", "Agathe Delmas", "Fille d’Octave", "PNJ", /Octave vivant/, /fille/i],
  ["victor", "Victor Perrin", "Majordome", "PNJ", /jouait l’assassin/, /majordome/i]
];

test("GM confirmation creates the seven source characters with safe public fields and available choices", async () => {
  const host = await setup({ headerActions: false });
  const confirm = await openConfirmation(host);
  await confirm();
  assert.equal(host.actors.length, 7);
  assert.equal(host.folders.length, 4);
  const folderNamed = name => host.folders.find(folder => folder.name === name);
  const root = folderNamed("Scénarios personnalisés");
  const scenario = folderNamed("Un meurtre de trop");
  const pcs = folderNamed("1. Personnages Joueurs");
  const npcs = folderNamed("2. Personnages Non-Joueurs");
  assert.equal(root.folder, null);
  assert.equal(scenario.folder, root.id);
  assert.equal(pcs.folder, scenario.id);
  assert.equal(npcs.folder, scenario.id);
  assert.equal(host.actors.filter(actor => actor.folder === pcs.id).length, 4);
  assert.equal(host.actors.filter(actor => actor.folder === npcs.id).length, 3);
  for (const [id, name, profession, role, truth, opening] of expectedCharacters) {
    const actor = host.actors.find(candidate => candidate.getFlag("sombre-classic-house", "unMeurtreDeTropId") === id);
    assert.ok(actor, id);
    assert.equal(actor.name, name);
    assert.equal(actor.system.profession, profession);
    assert.equal(actor.folder, role === "PJ" ? pcs.id : npcs.id);
    assert.equal(actor.type, "victime");
    assert.deepEqual(actor.ownership, { default: 0 });
    assert.equal(actor.system.playerName, "");
    assert.equal(actor.system.scenarioId, "un-meurtre-de-trop");
    assert.equal(actor.system.isAntagonist, false, "Role classification keeps the culprit concealed");
    assert.equal(actor.system.secret, "");
    assert.equal(actor.system.secretKind, "");
    assert.match(actor.system.gmNotes, truth);
    assert.match(actor.system.background, opening);
    const publicData = JSON.stringify({ ...actor, system: { ...actor.system, gmNotes: undefined } });
    assert.doesNotMatch(publicData, /détourn|meurtrière|coupe-papier|bracelet|maillon|buvard|vivant après|argent à son père|jouait l’assassin|sauce tomate/i);
    assert.doesNotMatch(publicData, truth);
    assert.equal(actor.system.personality, 0);
    for (const field of ["advantage", "disadvantage", "advantageDescription", "disadvantageDescription"]) {
      assert.equal(actor.system[field], "");
    }
    for (const prefix of ["personality", "advantage", "disadvantage", "traits"]) {
      assert.equal(actor.system[`${prefix}RandomUsed`], false);
      assert.equal(actor.system[`${prefix}RandomLocked`], false);
    }
    assert.deepEqual(actor.system.resources, {
      body: { value: 12, max: 12 }, spirit: { value: 12, max: 12 }, adrenaline: { value: 0, max: 3 }
    });
    const image = `systems/sombre-classic-house/assets/scenarios/un-meurtre-de-trop/portraits/${id}.webp`;
    assert.equal(actor.img, image);
    assert.equal(actor.prototypeToken.texture.src, image);
    assert.equal(actor.prototypeToken.name, name);
    assert.equal(actor.prototypeToken.actorLink, true);
  }
});

test("generated detective openings match the packaged conductor", async () => {
  const html = await readFile(new URL("../assets/scenarios/un-meurtre-de-trop/conducteur-un-meurtre-de-trop.html", import.meta.url), "utf8");
  const source = html.match(/<script>(const DATA = [\s\S]*?)<\/script>/)?.[1];
  assert.ok(source, "Packaged scenario data exists");
  const data = runInNewContext(`${source}; DATA`);
  const host = await setup();
  await (await openConfirmation(host))();
  for (const character of data.characters) {
    const actor = host.actors.find(a => a.getFlag("sombre-classic-house", "unMeurtreDeTropId") === character.id);
    assert.equal(actor.system.background, `${character.public}\n\n${character.opening}`);
    assert.ok(actor.system.gmNotes.includes(character.truth));
  }
});

const snapshot = value => JSON.stringify(value);

const portrait = id => `systems/sombre-classic-house/assets/scenarios/un-meurtre-de-trop/portraits/${id}.webp`;
const applyPatch = (target, changes) => {
  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split(".");
    const key = keys.pop();
    const parent = keys.reduce((object, part) => object[part] ??= {}, target);
    parent[key] = structuredClone(value);
  }
};

async function openAction(host, action) {
  await openConfirmation(host);
  const button = host.dialogs.at(-1).buttons[action];
  assert.equal(typeof button?.callback, "function", `Explicit ${action} action exists`);
  return button.callback;
}

test("portrait action changes only matching actor and linked or unlinked scene token images", async () => {
  const host = await setup();
  await (await openConfirmation(host))();
  const actorWrites = [];
  for (const actor of host.actors) {
    actor.img = "old-portrait.svg";
    actor.prototypeToken.texture = { src: "old-token.svg", scaleX: 0.7, tint: "#abcdef" };
    actor.system.resources.body.value = 4;
    actor.system.gmNotes = "Private progress";
    actor.ownership = { default: 0, player: 3 };
    actor.update = async changes => {
      actorWrites.push({ id: actor.id, changes });
      applyPatch(actor, changes);
    };
  }
  for (const id of [undefined, "unknown", "toString"]) {
    host.actors.push({ id: `unrelated-${id}`, name: "René Valmont", img: "keep.webp", getFlag: () => id,
      update: async () => assert.fail("Unrelated actors must not be updated") });
  }
  const tokenWrites = [];
  for (const actorLink of [true, false]) {
    const tokens = [host.actors[0], host.actors[1], host.actors[7]].map((actor, index) => ({
      id: `${actorLink}-${index}`, actorId: actor.id, actorLink, x: 123, y: 456, width: 2, height: 3,
      texture: { src: "old-token.svg", scaleX: 0.8, scaleY: 1.2, tint: "#aabbcc" },
      delta: { system: { resources: { body: { value: 1 } } } }, flags: { custom: true }
    }));
    host.scenes.push({ tokens, updateEmbeddedDocuments: async (type, updates) => {
      assert.equal(type, "Token");
      tokenWrites.push(updates);
      for (const update of updates) {
        assert.deepEqual(Object.keys(update).sort(), ["_id", "texture.src"]);
        applyPatch(tokens.find(token => token.id === update._id), { "texture.src": update["texture.src"] });
      }
    } });
  }
  const expectedActors = JSON.parse(snapshot(host.actors));
  for (const actor of expectedActors.slice(0, 7)) {
    actor.img = portrait(actor.flags["sombre-classic-house"].unMeurtreDeTropId);
    actor.prototypeToken.texture.src = actor.img;
  }
  const expectedScenes = JSON.parse(snapshot(host.scenes));
  for (const scene of expectedScenes) {
    scene.tokens[0].texture.src = portrait("rene");
    scene.tokens[1].texture.src = portrait("jeanne");
  }
  const apply = await openAction(host, "portraits");
  assert.equal(actorWrites.length, 0, "Opening the dialog does not apply images");
  await apply();
  assert.equal(actorWrites.length, 7);
  for (const { changes } of actorWrites) assert.deepEqual(Object.keys(changes).sort(), ["img", "prototypeToken.texture.src"]);
  assert.equal(snapshot(host.actors), snapshot(expectedActors));
  assert.equal(snapshot(host.scenes), snapshot(expectedScenes));
  assert.equal(tokenWrites.length, 2);
  await apply();
  assert.equal(actorWrites.length, 7, "Already-correct actors perform no writes");
  assert.equal(tokenWrites.length, 2, "Already-correct tokens perform no writes");
  assert.equal(host.notifications.filter(entry => entry.level === "error").length, 0);
});

test("portrait permission is rechecked for stale dialogs before any write", async t => {
  for (const mode of ["player", "secondary", "missing", "null"]) {
    await t.test(mode, async () => {
      const host = await setup();
      await (await openConfirmation(host))();
      host.actors[0].img = "old.svg";
      let writes = 0;
      host.actors[0].update = async () => { writes++; };
      const apply = await openAction(host, "portraits");
      if (mode === "player") host.game.user.isGM = false;
      else host.game.users.activeGM = mode === "secondary" ? { id: "other-gm" } : mode === "null" ? null : undefined;
      await apply();
      assert.equal(writes, 0);
      if (mode !== "player") assert.equal(host.notifications.at(-1).level, "warn");
    });
  }
});

test("portrait double clicks across dialogs share an in-flight guard", async () => {
  const host = await setup();
  await (await openConfirmation(host))();
  host.actors[0].img = "old.svg";
  let writes = 0;
  host.actors[0].update = async changes => {
    writes++;
    await Promise.resolve();
    applyPatch(host.actors[0], changes);
  };
  const first = await openAction(host, "portraits");
  const second = await openAction(host, "portraits");
  await Promise.all([first(), second(), first()]);
  assert.equal(writes, 1);
});

test("portrait storage failures notify and release the guard for a preserving retry", async t => {
  for (const failure of ["actor", "token"]) {
    await t.test(failure, async () => {
      const host = await setup();
      await (await openConfirmation(host))();
      const actor = host.actors[0];
      actor.img = "old.svg";
      const token = { id: "token", actorId: actor.id, texture: { src: "old.svg" }, x: 10 };
      let fail = true;
      let actorWrites = 0;
      actor.update = async changes => {
        if (fail && failure === "actor") throw new Error("Storage failure");
        actorWrites++;
        applyPatch(actor, changes);
      };
      host.scenes.push({ tokens: [token], updateEmbeddedDocuments: async () => {
        if (fail && failure === "token") throw new Error("Storage failure");
        token.texture.src = portrait("rene");
      } });
      const apply = await openAction(host, "portraits");
      await assert.doesNotReject(apply);
      assert.equal(host.notifications.at(-1).level, "error");
      assert.match(host.notifications.at(-1).message, /Storage failure/);
      fail = false;
      await apply();
      assert.equal(actor.img, portrait("rene"));
      assert.equal(token.texture.src, portrait("rene"));
      assert.equal(actorWrites, 1, "Retry skips previously completed actor updates");
      assert.equal(host.notifications.at(-1).level, "info");
    });
  }
});

test("landing action creates only a spoiler-free inactive 1920x1080 scene", async () => {
  const host = await setup();
  const create = await openAction(host, "landing");
  assert.equal(host.scenes.length, 0, "Opening the dialog does not create a scene");
  const scene = await create();
  assert.equal(host.scenes.length, 1);
  assert.equal(scene, host.scenes[0]);
  assert.deepEqual(JSON.parse(snapshot(scene)), {
    id: "scene-0", name: "Un meurtre de trop",
    background: { src: "systems/sombre-classic-house/assets/scenarios/un-meurtre-de-trop/landing-un-meurtre-de-trop.webp" },
    width: 1920, height: 1080, padding: 0, grid: { type: 0 }, tokenVision: false,
    fog: { exploration: false }, navigation: true, active: false, tokens: [],
    flags: { "sombre-classic-house": { unMeurtreDeTropLanding: true } }
  });
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
  assert.equal(host.notifications.at(-1).level, "info");
});

test("landing creation preserves an existing flagged scene and ignores an unrelated namesake", async () => {
  const namesake = { id: "other", name: "Un meurtre de trop", active: true, getFlag: () => undefined };
  const host = await setup({ scenes: [namesake] });
  const create = await openAction(host, "landing");
  const scene = await create();
  assert.notEqual(scene, namesake);
  scene.name = "Accueil personnalisé";
  scene.background.src = "custom.webp";
  scene.active = true;
  scene.width = 1500;
  scene.tokens = [{ _id: "custom", x: 50 }];
  const before = snapshot(host.scenes);
  let writes = 0;
  Scene.create = async () => { writes++; };
  assert.equal(await create(), scene);
  assert.equal(await create(), scene);
  assert.equal(writes, 0);
  assert.equal(snapshot(host.scenes), before);
  assert.match(host.notifications.at(-1).message, /conservée/);
});

test("landing permission is rechecked for stale dialogs before any write", async t => {
  for (const mode of ["player", "secondary", "missing", "null"]) {
    await t.test(mode, async () => {
      const host = await setup();
      const create = await openAction(host, "landing");
      if (mode === "player") host.game.user.isGM = false;
      else host.game.users.activeGM = mode === "secondary" ? { id: "other-gm" } : mode === "null" ? null : undefined;
      await create();
      assert.equal(host.scenes.length, 0);
      if (mode !== "player") assert.equal(host.notifications.at(-1).level, "warn");
    });
  }
});

test("landing double clicks across dialogs create just one scene", async () => {
  const host = await setup();
  const first = await openAction(host, "landing");
  const second = await openAction(host, "landing");
  await Promise.all([first(), second(), first()]);
  assert.equal(host.scenes.length, 1);
});

test("landing storage failure notifies and releases the guard for retry", async () => {
  const host = await setup();
  const create = await openAction(host, "landing");
  const originalCreate = Scene.create;
  Scene.create = async () => { throw new Error("Scene storage failure"); };
  await assert.doesNotReject(create);
  assert.equal(host.scenes.length, 0);
  assert.equal(host.notifications.at(-1).level, "error");
  assert.match(host.notifications.at(-1).message, /Scene storage failure/);
  Scene.create = originalCreate;
  const scene = await create();
  assert.equal(scene, host.scenes[0]);
  assert.equal(host.scenes.length, 1);
  assert.equal(host.notifications.at(-1).level, "info");
});

test("dialog explains independent image and landing actions with safe preview links", async () => {
  const host = await setup();
  await openConfirmation(host);
  const dialog = host.dialogs.at(-1);
  assert.equal(dialog.buttons.portraits.label, "Appliquer les portraits");
  assert.equal(dialog.buttons.landing.label, "Créer la scène d’accueil");
  assert.equal(dialog.default, "cancel");
  assert.doesNotMatch(dialog.content, /initiales|coupe-papier|détourn|bracelet|maillon/i);
  assert.match(dialog.content, /uniquement les images/i);
  assert.match(dialog.content, /sans activation automatique/i);
  assert.match(dialog.content, /scène.*existante.*conservée/i);
  for (const [id] of expectedCharacters) assert.ok(dialog.content.includes(`href="${portrait(id)}"`));
  for (const extension of ["html", "webp"]) {
    assert.ok(dialog.content.includes(`href="systems/sombre-classic-house/assets/scenarios/un-meurtre-de-trop/landing-un-meurtre-de-trop.${extension}"`));
  }
  assert.equal(host.actors.length, 0);
  assert.equal(host.scenes.length, 0);
});

test("repeated confirmation preserves complete existing actor state and fills only missing IDs", async () => {
  const host = await setup();
  const confirm = await openConfirmation(host);
  await confirm();
  const first = host.actors[0];
  first.name = "René modifié";
  first.folder = "custom-folder";
  first.ownership = { default: 1, player42: 3 };
  first.system.resources.body.value = 3;
  first.system.resources.spirit.value = 5;
  first.system.personality = 14;
  first.system.advantage = "Fort";
  first.system.personalityRandomUsed = true;
  first.system.gmNotes = "Progression de la partie";
  first.system.secret = "Secret ajouté par le MJ";
  first.img = "custom-image.svg";
  first.prototypeToken.texture.src = "custom-token.svg";
  first.flags.external = { custom: true };
  const saved = snapshot(host.actors);
  const savedFolders = snapshot(host.folders);
  Actor.createDocuments = async () => assert.fail("A complete scenario performs no actor write");
  await confirm();
  assert.equal(host.notifications.filter(entry => entry.level === "error").length, 0, "A no-op performs no actor write");
  assert.equal(snapshot(host.actors), saved);
  assert.equal(snapshot(host.folders), savedFolders);

  const removed = host.actors.pop();
  const retained = snapshot(host.actors);
  let added;
  Actor.createDocuments = async data => {
    added = data;
    for (const actor of data) {
      actor.getFlag = (scope, key) => actor.flags?.[scope]?.[key];
      host.actors.push(actor);
    }
    return data;
  };
  // Foundry folder references may be document objects, not just IDs.
  for (const folder of host.folders) {
    if (typeof folder.folder === "string") folder.folder = { id: folder.folder };
  }
  await confirm();
  assert.equal(added.length, 1);
  assert.equal(added[0].flags["sombre-classic-house"].unMeurtreDeTropId, removed.flags["sombre-classic-house"].unMeurtreDeTropId);
  assert.equal(snapshot(host.actors.slice(0, -1)), retained);
  assert.equal(host.actors.length, 7);
  assert.equal(host.folders.length, 4);
});

test("simultaneous confirmations share an asynchronous guard across dialogs", async () => {
  const host = await setup();
  const first = await openConfirmation(host);
  const second = await openConfirmation(host);
  await Promise.all([first(), second(), first()]);
  assert.equal(host.folders.length, 4);
  assert.equal(host.actors.length, 7);
  assert.equal(new Set(host.actors.map(actor => actor.getFlag("sombre-classic-house", "unMeurtreDeTropId"))).size, 7);
});

test("independent GM clients share one designated creator without duplicate actors or folders", async () => {
  const actors = [];
  const folders = [];
  const designated = await setup({ actors, folders, isolated: true });
  const other = await setup({ actors, folders, isolated: true, userId: "gm-secondary" });
  const primaryConfirm = await openConfirmation(designated);
  const otherConfirm = await openConfirmation(other);
  await Promise.all([otherConfirm(), primaryConfirm()]);
  assert.equal(actors.length, 7, "Only the designated GM creates actors");
  assert.equal(folders.length, 4, "Only the designated GM creates folders");
  assert.equal(new Set(actors.map(actor => actor.getFlag("sombre-classic-house", "unMeurtreDeTropId"))).size, 7);
  assert.equal(new Set(folders.map(folder => `${folder.folder}/${folder.name}`)).size, 4);
  assert.equal(designated.notifications.filter(entry => entry.level === "error").length, 0);
  assert.equal(other.notifications.length, 1);
  assert.equal(other.notifications[0].level, "warn");
  assert.match(other.notifications[0].message, /compte.*MJ.*désigné/i);
});

test("missing activeGM safely rejects confirmation before any writes", async t => {
  for (const activeGM of [undefined, null]) {
    await t.test(String(activeGM), async () => {
      const host = await setup();
      const confirm = await openConfirmation(host);
      host.game.users.activeGM = activeGM;
      Folder.create = async () => assert.fail("Missing activeGM must not write folders");
      Actor.createDocuments = async () => assert.fail("Missing activeGM must not write actors");
      await assert.doesNotReject(confirm);
      assert.equal(host.actors.length, 0);
      assert.equal(host.folders.length, 0);
      assert.equal(host.notifications.length, 1);
      assert.equal(host.notifications[0].level, "warn");
      assert.match(host.notifications[0].message, /compte.*MJ.*désigné/i);
    });
  }
});

test("partial failure reports an error and releases the guard for a preserving retry", async () => {
  const host = await setup();
  const confirm = await openConfirmation(host);
  const create = Actor.createDocuments;
  Actor.createDocuments = async data => {
    await create(data.slice(0, 2));
    throw new Error("Simulated storage failure");
  };
  await assert.doesNotReject(confirm);
  assert.equal(host.actors.length, 2);
  assert.equal(host.notifications.filter(entry => entry.level === "error").length, 1);
  const saved = snapshot(host.actors);
  Actor.createDocuments = create;
  await confirm();
  assert.equal(snapshot(host.actors.slice(0, 2)), saved);
  assert.equal(host.actors.length, 7);
  assert.equal(host.folders.length, 4);
  assert.match(host.notifications.at(-1).message, /5 fiches créées/);
  await confirm();
  assert.match(host.notifications.at(-1).message, /7 fiches.*conservées/);
});

test("system init imports and registers the optional generator without creating documents", async () => {
  const source = await readFile(new URL("../sombre-classic.mjs", import.meta.url), "utf8");
  assert.match(source, /import\s+\{\s*registerUnMeurtreDeTropGenerator\s*\}\s+from\s+"\.\/module\/un-meurtre-de-trop\.mjs"/);
  const host = await setup();
  host.hooks.clear();
  globalThis.foundry = { data: { fields: {} }, abstract: { TypeDataModel: class {} } };
  globalThis.ActorSheet = class {};
  globalThis.Application = class {};
  globalThis.CONFIG = { Actor: {} };
  globalThis.Actors = { registerSheet() {}, unregisterSheet() {} };
  game.settings = { register() {} };
  const once = new Map();
  Hooks.once = (name, callback) => once.set(name, callback);
  await import(new URL("../sombre-classic.mjs", import.meta.url));
  assert.equal(host.hooks.size, 0, "Registration waits for init");
  once.get("init")();
  assert.equal(host.actors.length, 0);
  assert.equal(host.folders.length, 0);
  assert.equal(host.dialogs.length, 0);
  host.render();
  assert.match(host.buttons.at(-1).markup, /data-create-un-meurtre-de-trop/);
  assert.equal(host.actors.length, 0);
});
