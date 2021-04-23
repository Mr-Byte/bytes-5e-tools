import { ActiveStatusEffectsSettings } from "./settings";
import { Feature } from "../../feature";
import { MODULE_CONFIG } from "../../config";
import { StatusEffect } from "./types";

export class ActiveStatusEffects implements Feature {
    #originalStatusEffects!: StatusEffect[];

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
        Hooks.on("preCreateActiveEffect", (_: unknown, effect: StatusEffect) => {
            [effect.icon] = effect.icon.split("#");
        });
    }

    public async overrideStatusEffects(): Promise<void> {
        const statusEffects = await game.settings.get(MODULE_CONFIG.NAME, "statusEffects") as StatusEffect[] | null | undefined;
        CONFIG.statusEffects = statusEffects ?? this.#originalStatusEffects;
    }
}
