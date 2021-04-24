import type { StatusEffect } from "./types";
import { set } from "lodash-es";
import { MODULE_CONFIG, modKey } from "../../config";
import { ReactFormApplication } from "../../ui/ReactFormApplication";
import View, { Props } from "../../components/active-status-effects-settings/View";

export class ActiveStatusEffectsSettings extends ReactFormApplication<Props> {
    private static defaultStatusEffects: StatusEffect[];

    public static init(defaultStatusEffects: StatusEffect[]): void {
        game.settings.registerMenu(MODULE_CONFIG.NAME, "active-status-effects", {
            name: modKey("active-status-effects.settings-name"),
            label: modKey("active-status-effects.settings-label"),
            restricted: true,
            type: ActiveStatusEffectsSettings,
            icon: "fas fa-cogs"
        });

        ActiveStatusEffectsSettings.defaultStatusEffects = defaultStatusEffects;
    }

    public static get defaultOptions(): FormApplication.Options {
        return {
            ...super.defaultOptions,
            id: `${MODULE_CONFIG.NAME}.active-status-effects.settings`,
            title: modKey("active-status-effects.config-title"),
            width: 525,
            height: 400,
            editable: true,
            resizable: false,
            submitOnChange: false,
            submitOnClose: false,
            closeOnSubmit: true,
        };
    }

    protected get reactElement() {
        return View;
    }

    protected async _updateObject(_event: Event, formData?: Record<string, unknown>): Promise<void> {
        if (!formData) {
            return;
        }

        const statusEffects: StatusEffect[] = Object.entries(formData)
            .reduce(
                (statusEffects, [path, value]) => path.startsWith("#")
                    ? statusEffects
                    : set(statusEffects, path, value),
                []
            );

        for (const statusEffect of statusEffects) {
            statusEffect.icon = `${statusEffect.icon}#${statusEffect.id}`;
        }

        await game.settings.set(MODULE_CONFIG.NAME, "statusEffects", statusEffects);
    }

    getData() {
        const statusEffects = duplicate(CONFIG.statusEffects).map(statusEffect => ({
            ...statusEffect,
            icon: statusEffect.icon.split("#")[0]
        }));

        return {
            statusEffects,
            defaultStatusEffects: ActiveStatusEffectsSettings.defaultStatusEffects
        };
    }
}
