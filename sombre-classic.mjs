import { SombreVictimData } from "./module/data-models.mjs";
import { SombreActorSheet } from "./module/actor-sheet.mjs";
import { registerTokenNameHooks } from "./module/token-names.mjs";
import { registerTraitDashboard } from "./module/trait-dashboard.mjs";
import { registerHelix2008Generator } from "./module/helix-2008.mjs";
import { registerPatrouille13Generator } from "./module/patrouille-13.mjs";

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
  registerHelix2008Generator();
  registerPatrouille13Generator();
});
