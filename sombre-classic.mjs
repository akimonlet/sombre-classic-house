import { SombreVictimData, SombreZeroData } from "./module/data-models.mjs";
import { SombreActorSheet } from "./module/actor-sheet.mjs";
import { SombreZeroActorSheet } from "./module/zero-actor-sheet.mjs";
import { createPregensOnce, registerPregenSetting } from "./module/pregens.mjs";

Hooks.once("init", () => {
  console.log("Sombre — Scénarios | Initialisation");

  CONFIG.Actor.dataModels = {
    victime: SombreVictimData,
    zero: SombreZeroData
  };

  CONFIG.Actor.trackableAttributes = {
    victime: {
      bar: ["resources.body", "resources.spirit"],
      value: ["resources.adrenaline"]
    }
  };

  Actors.unregisterSheet("core", ActorSheet, { types: ["victime"] });
  Actors.registerSheet("sombre-classic-house", SombreActorSheet, {
    types: ["victime"],
    makeDefault: true,
    label: "Fiche Sombre Classic"
  });

  Actors.unregisterSheet("core", ActorSheet, { types: ["zero"] });
  Actors.registerSheet("sombre-classic-house", SombreZeroActorSheet, {
    types: ["zero"],
    makeDefault: true,
    label: "Fiche Sombre Zéro"
  });

  registerPregenSetting();
});

Hooks.once("ready", createPregensOnce);
