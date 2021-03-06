import { cloneDeep, memoize, set } from "lodash-es";
import { modKey, MODULE_CONFIG } from "config";
import { ReactFormApplication } from "common/components/view/ReactFormApplication";
import { SettingsForm, SettingsFormProps } from "features/active-status-effects/settings/components/StatusEffectSettingsForm";
import type { StatusEffect } from "features/active-status-effects/types";

export class ActiveStatusEffectsSettings extends ReactFormApplication<SettingsFormProps> {
    private static defaultStatusEffects: StatusEffect[];

    public static init(defaultStatusEffects: StatusEffect[]): void {
        game.settings.registerMenu(MODULE_CONFIG.NAME, "active-status-effects", {
            name: modKey("active-status-effects.settings.name"),
            label: modKey("active-status-effects.settings.label.manage"),
            restricted: true,
            type: ActiveStatusEffectsSettings,
            icon: "fas fa-cogs",
        });

        ActiveStatusEffectsSettings.defaultStatusEffects = defaultStatusEffects;
    }

    public static get defaultOptions(): FormApplication.Options {
        return {
            ...super.defaultOptions,
            id: "ActiveStatusEffectsSettings",
            title: modKey("active-status-effects.settings.title"),
            width: 525,
            height: 400,
            editable: true,
            resizable: false,
            submitOnChange: false,
            submitOnClose: false,
            closeOnSubmit: true,
        };
    }

    get component() {
        return SettingsForm;
    }

    protected async _updateObject(_event: Event, formData?: Record<string, unknown>): Promise<void> {
        if (!formData) {
            return;
        }

        const statusEffects: StatusEffect[] = Object.entries(formData)
            .reduce(
                (statusEffects, [path, value,]) => set(statusEffects, path, value),
                []
            );

        for (const statusEffect of statusEffects) {
            statusEffect.icon = `${statusEffect.icon}#${statusEffect.id}.png`;
        }

        await game.settings.set(MODULE_CONFIG.NAME, "statusEffects", statusEffects);
    }

    static convertStatusEffects = memoize((statusEffects: StatusEffect[]): SettingsFormProps => {
        return {
            statusEffects: cloneDeep(statusEffects).map(statusEffect => ({
                ...statusEffect,
                icon: statusEffect.icon.split("#")[0],
            })),
            defaultStatusEffects: ActiveStatusEffectsSettings.defaultStatusEffects,
        };
    });

    getData() {
        return ActiveStatusEffectsSettings.convertStatusEffects(CONFIG.statusEffects)
    }
}
