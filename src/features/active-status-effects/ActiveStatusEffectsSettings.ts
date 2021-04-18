import { i18n, MODULE_CONFIG, template } from "../../config.js";

interface Data {
    statusEffects: typeof CONFIG.statusEffects
}

export class ActiveStatusEffectsSettings extends FormApplication<FormApplication.Options, Data> {
    public static init(): void {
        game.settings.registerMenu(MODULE_CONFIG.NAME, "active-status-effects", {
            name: i18n("active-status-effects.settings-name"),
            label: i18n("active-status-effects.settings-label"),
            restricted: true,
            type: ActiveStatusEffectsSettings,
            icon: "fas fa-cogs"
        });
    }

    public static get defaultOptions(): FormApplication.Options {
        return {
            ...super.defaultOptions,
            id: `${MODULE_CONFIG.NAME}.active-status-effects.settings`,
            classes: ["dnd5e sheet"],
            template: template("settings/active-status-effects.hbs"),
            width: 400,
            height: 300,
            editable: true,
            resizable: false,
            submitOnChange: false,
            submitOnClose: false,
            closeOnSubmit: true,
        };
    }

    public getData(_options?: Application.RenderOptions) {
        console.log(this.object);

        return {
            statusEffects: CONFIG.statusEffects
        };
    }

    protected _updateObject(_event: Event, _formData?: Record<string, unknown>): Promise<unknown> {
        return Promise.resolve(null);
    }

}
