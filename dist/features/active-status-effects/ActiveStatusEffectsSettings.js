import { i18n, MODULE_CONFIG, template } from "../../config.js";
export class ActiveStatusEffectsSettings extends FormApplication {
    static init() {
        game.settings.registerMenu(MODULE_CONFIG.NAME, "active-status-effects", {
            name: i18n("active-status-effects.settings-name"),
            label: i18n("active-status-effects.settings-label"),
            restricted: true,
            type: ActiveStatusEffectsSettings,
            icon: "fas fa-cogs"
        });
    }
    static get defaultOptions() {
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
    getData(_options) {
        console.log(this.object);
        return {
            statusEffects: CONFIG.statusEffects
        };
    }
    _updateObject(_event, _formData) {
        return Promise.resolve(null);
    }
}
