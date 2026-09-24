import test from "node:test";
import assert from "node:assert/strict";

import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const moduleURL = new URL("../module/un-meurtre-de-trop.mjs", import.meta.url);
let instance = 0;

// Only the Foundry host boundary is mocked; the generator runs unchanged.
async function setup({ isGM = true, headerActions = true, userId = "gm-primary", actors = [], folders = [], isolated = false } = {}) {
  const hooks = new Map();
  const buttons = [];
  const dialogs = [];
  const notifications = [];
  globalThis.Hooks = { on: (name, callback) => hooks.set(name, callback) };
  const clientGame = globalThis.game = { user: { id: userId, isGM }, users: { activeGM: { id: "gm-primary" } }, actors, folders };
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
    { Hooks, game: clientGame, CONST, ui, Folder, Actor, Dialog, $ }
  ) : await import(`${moduleURL}?test=${++instance}`).catch(error => {
    if (error.code === "ERR_MODULE_NOT_FOUND") return {};
    throw error;
  });
  assert.equal(typeof generator.registerUnMeurtreDeTropGenerator, "function", "Optional generator registration exists");
  generator.registerUnMeurtreDeTropGenerator();
  return { hooks, buttons, dialogs, notifications, actors, folders, game: clientGame, render: () => hooks.get("renderActorDirectory")({}, html) };
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
  ["malik", "Malik Serra", "Privé débrouillard", "PJ", /Octave vivant après le jeu/, /vaisselle/],
  ["diane", "Diane Vasseur", "Détective médiatique", "PJ", /argent à son père après le jeu/, /méridienne/],
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
    const image = `systems/sombre-classic-house/assets/scenarios/un-meurtre-de-trop/tokens/${id}.svg`;
    assert.equal(actor.img, image);
    assert.equal(actor.prototypeToken.texture.src, image);
    assert.equal(actor.prototypeToken.name, name);
    assert.equal(actor.prototypeToken.actorLink, true);
  }
});

const snapshot = value => JSON.stringify(value);

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
