import type { Feature } from "../../feature";
import { MODULE_CONFIG } from "../../config";
import { ActiveStatusEffectsSettings } from "./ActiveStatusEffectsSettings";

type StatusEffects = typeof CONFIG.statusEffects;

export class ActiveStatusEffects implements Feature {
    #originalStatusEffects!: StatusEffects;

    public init(): void {
        this.#originalStatusEffects = CONFIG.statusEffects;

        this.registerSettings();
        this.registerHooks();

        ActiveStatusEffectsSettings.init(this.#originalStatusEffects);
    }

    private registerSettings(): void {
        game.settings.register(MODULE_CONFIG.NAME, "statusEffects", {
            scope: "world",
            config: false,
            onChange: () => void this.overrideStatusEffects()
        });
    }

    private registerHooks(): void {
        Hooks.on("ready", () => void this.overrideStatusEffects());
    }

    public async overrideStatusEffects(): Promise<void> {
        const statusEffects = await game.settings.get(MODULE_CONFIG.NAME, "statusEffects") as StatusEffects | null | undefined;
        CONFIG.statusEffects = statusEffects ?? this.#originalStatusEffects;
    }
}