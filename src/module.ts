import type { Feature, FeatureStatic } from "./feature";
import { ActiveStatusEffects } from "./features/active-status-effects";
// import { TokenHoverDisplay } from "./features/token-hover-display/index";

const AVAILABLE_FEATURES: FeatureStatic[] = [
    ActiveStatusEffects,
    // TokenHoverDisplay
];
const ENABLED_FEATURES: Feature[] = [];

Hooks.once("init", () => {
    for (const feature of AVAILABLE_FEATURES) {
        const activeFeature = new feature();

        activeFeature.init();

        ENABLED_FEATURES.push(activeFeature);
    }
});
