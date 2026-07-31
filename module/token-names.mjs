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

  for (const scene of game.scenes) {
    const updates = scene.tokens
      .filter((token) => token.actorId === actor.id && token.name !== tokenName)
      .map((token) => ({ _id: token.id, name: tokenName }));
    if (updates.length) await scene.updateEmbeddedDocuments("Token", updates);
  }
};

export const registerTokenNameHooks = () => {
  Hooks.on("preUpdateActor", (actor, changes) => {
    const actorNameChanged = hasChanged(changes, "name");
    const playerNameChanged = hasChanged(changes, "system.playerName");
    if (!actorNameChanged && !playerNameChanged) return;

    const actorName = actorNameChanged ? changedValue(changes, "name") : actor.name;
    const playerName = playerNameChanged
      ? changedValue(changes, "system.playerName")
      : actor.system.playerName;
    foundry.utils.setProperty(changes, "prototypeToken.name", tokenNameFor(actorName, playerName));
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
      if (!String(actor.system.playerName ?? "").trim()) continue;
      const tokenName = tokenNameFor(actor.name, actor.system.playerName);
      if (actor.prototypeToken.name !== tokenName) {
        await actor.update({ "prototypeToken.name": tokenName });
      }
      await updatePlacedTokens(actor, tokenName);
    }
  });
};
