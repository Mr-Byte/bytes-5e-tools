import { ActiveStatusEffects } from "./features/active-status-effects/index.js";
import { TokenHoverDisplay } from "./features/token-hover-display/index.js";
const AVAILABLE_FEATURES = [
    ActiveStatusEffects,
    TokenHoverDisplay
];
const ENABLED_FEATURES = [];
Hooks.once("init", () => {
    for (const feature of AVAILABLE_FEATURES) {
        const activeFeature = new feature();
        activeFeature.init();
        ENABLED_FEATURES.push(activeFeature);
    }
});
