import { SombreVictimData } from "./module/data-models.mjs";
import { SombreActorSheet } from "./module/actor-sheet.mjs";
import { registerTokenNameHooks } from "./module/token-names.mjs";
import { registerTraitDashboard } from "./module/trait-dashboard.mjs";

Hooks.once("init", () => {
  console.log("Sombre Classic — Fiche | Initialisation");

  CONFIG.Actor.dataModels = {
    victime: SombreVictimData
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

  registerTokenNameHooks();
  registerTraitDashboard();
});
