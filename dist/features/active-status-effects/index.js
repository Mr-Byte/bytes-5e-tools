var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _originalStatusEffects;
import { MODULE_CONFIG } from "../../config.js";
import { ActiveStatusEffectsSettings } from "./ActiveStatusEffectsSettings.js";
export class ActiveStatusEffects {
    constructor() {
        _originalStatusEffects.set(this, void 0);
    }
    init() {
        __classPrivateFieldSet(this, _originalStatusEffects, CONFIG.statusEffects);
        this.registerSettings();
        this.registerHooks();
        ActiveStatusEffectsSettings.init();
    }
    registerSettings() {
        game.settings.register(MODULE_CONFIG.NAME, "statusEffects", {
            scope: "world",
            config: false,
            onChange: () => void this.overrideStatusEffects()
        });
    }
    registerHooks() {
        Hooks.on("ready", () => void this.overrideStatusEffects());
    }
    async overrideStatusEffects() {
        const statusEffects = await game.settings.get(MODULE_CONFIG.NAME, "statusEffects");
        CONFIG.statusEffects = statusEffects ?? __classPrivateFieldGet(this, _originalStatusEffects);
    }
}
_originalStatusEffects = new WeakMap();
