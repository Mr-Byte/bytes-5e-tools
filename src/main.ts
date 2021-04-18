import type { Feature, FeatureStatic } from "./feature.js";
import { ActiveStatusEffects } from "./features/active-status-effects/index.js";
import { TokenHoverDisplay } from "./features/token-hover-display/index.js";

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
});
