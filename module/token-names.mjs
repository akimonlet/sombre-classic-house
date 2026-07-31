const changedValue = (changes, path) => {
  if (Object.prototype.hasOwnProperty.call(changes, path)) return changes[path];
  return foundry.utils.getProperty(changes, path);
};

const hasChanged = (changes, path) => (
  Object.prototype.hasOwnProperty.call(changes, path)
  || foundry.utils.hasProperty(changes, path)
);

const tokenNameFor = (actorName, playerName) => {
  const player = String(playerName ?? "").trim();
  return player ? `${actorName} - ${player}` : actorName;
};

const updatePlacedTokens = async (actor, tokenName) => {
  if (!game.user.isGM) return;
  const always = CONST.TOKEN_DISPLAY_MODES.ALWAYS;

  for (const scene of game.scenes) {
    const updates = scene.tokens
      .filter((token) => (
        token.actorId === actor.id
        && (token.name !== tokenName || token.displayName !== always)
      ))
      .map((token) => ({ _id: token.id, name: tokenName, displayName: always }));
    if (updates.length) await scene.updateEmbeddedDocuments("Token", updates);
  }
};

export const registerTokenNameHooks = () => {
  Hooks.on("preCreateActor", (actor) => {
    actor.updateSource({ "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS });
  });

  Hooks.on("preUpdateActor", (actor, changes) => {
    const actorNameChanged = hasChanged(changes, "name");
    const playerNameChanged = hasChanged(changes, "system.playerName");
    if (!actorNameChanged && !playerNameChanged) return;

    const actorName = actorNameChanged ? changedValue(changes, "name") : actor.name;
    const playerName = playerNameChanged
      ? changedValue(changes, "system.playerName")
      : actor.system.playerName;
    foundry.utils.setProperty(changes, "prototypeToken.name", tokenNameFor(actorName, playerName));
    foundry.utils.setProperty(changes, "prototypeToken.displayName", CONST.TOKEN_DISPLAY_MODES.ALWAYS);
  });

  Hooks.on("updateActor", async (actor, changes) => {
    const actorNameChanged = hasChanged(changes, "name");
    const playerNameChanged = hasChanged(changes, "system.playerName");
    if (!actorNameChanged && !playerNameChanged) return;

    await updatePlacedTokens(actor, tokenNameFor(actor.name, actor.system.playerName));
  });

  Hooks.once("ready", async () => {
    if (!game.user.isGM) return;
    for (const actor of game.actors) {
      const tokenName = tokenNameFor(actor.name, actor.system.playerName);
      const update = {};
      if (actor.prototypeToken.name !== tokenName) update["prototypeToken.name"] = tokenName;
      if (actor.prototypeToken.displayName !== CONST.TOKEN_DISPLAY_MODES.ALWAYS) {
        update["prototypeToken.displayName"] = CONST.TOKEN_DISPLAY_MODES.ALWAYS;
      }
      if (Object.keys(update).length) await actor.update(update);
      await updatePlacedTokens(actor, tokenName);
    }
  });
};
