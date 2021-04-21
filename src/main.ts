import "../styles/active-status-effects-settings.less";

import type { Feature, FeatureStatic } from "./feature";
import { ActiveStatusEffects } from "./features/active-status-effects";
import { TokenHoverDisplay } from "./features/token-hover-display";

const AVAILABLE_FEATURES: FeatureStatic[] = [
    ActiveStatusEffects,
    TokenHoverDisplay
];
const ENABLED_FEATURES: Feature[] = [];

Hooks.once("init", () => {
    for (const feature of AVAILABLE_FEATURES) {
        const activeFeature = new feature();

        activeFeature.init();

        ENABLED_FEATURES.push(activeFeature);
    }

    registerHandlebarsHelpers();
});


function registerHandlebarsHelpers() {
    Handlebars.registerHelper("b5e_concat", handlebarsConcat);
}

function handlebarsConcat(...args: unknown[]) {
    return args.slice(0, -1).join("");
}
