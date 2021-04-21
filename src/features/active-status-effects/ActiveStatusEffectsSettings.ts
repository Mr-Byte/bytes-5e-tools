import { i18n, MODULE_CONFIG, template } from "../../config";
import set from "lodash.set";

type StatusEffects = typeof CONFIG.statusEffects;

interface Data {
    statusEffects: StatusEffects;
}

export class ActiveStatusEffectsSettings extends FormApplication<FormApplication.Options, Data> {
    #statusEffects: typeof CONFIG.statusEffects;

    constructor(object?: Data, options?: FormApplication.Options) {
        super(object, options);

        this.#statusEffects = duplicate(CONFIG.statusEffects);
    }

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
            title: i18n("active-status-effects.config-title"),
            classes: ["active-status-effect-settings"],
            template: template("settings/active-status-effects.hbs"),
            width: 525,
            height: 400,
            editable: true,
            resizable: true,
            submitOnChange: false,
            submitOnClose: false,
            closeOnSubmit: true,
        };
    }

    public getData(_options?: Application.RenderOptions) {
        return {
            statusEffects: this.#statusEffects
        };
    }

    public activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find(".status-effect-control").on("click", (event: JQuery.TriggeredEvent) => this.onEffectControl(event));
        html.find(".status-effect-name").on("click", this.onToggleEffectSettings.bind(this));
    }

    private onEffectControl(event: JQuery.TriggeredEvent<unknown, unknown, HTMLElement>) {
        event.preventDefault();
        const button = event.currentTarget;

        switch (button.dataset.action) {
            case "delete": {
                this.deleteEffect(button);
                return;
            }
        }
    }

    private onToggleEffectSettings(event: JQuery.TriggeredEvent<unknown, unknown, HTMLElement>) {
        event.preventDefault();
        const toggleLink = event.currentTarget;
        const settings = toggleLink.closest(".status-effect")?.querySelector<HTMLElement>(".status-effect-settings");

        if (settings) {
            settings.style.display = settings.style.display === "none" ? "block" : "none";
        }
    }

    private deleteEffect(eventTarget: HTMLElement) {
        const statusEffectContainer = eventTarget.closest<HTMLElement>(".status-effect");
        const effectId = statusEffectContainer?.dataset.effectId;

        this.#statusEffects = this.#statusEffects.filter(effect => effect.id !== effectId);
        this.render();
    }

    protected async _updateObject(_event: Event, _formData?: Record<string, unknown>): Promise<void> {
        if (!_formData) {
            return;
        }

        const statusEffects: StatusEffects = [];
        for (const [path, value] of Object.entries(_formData)) {
            set(statusEffects, path, value);
        }

        await game.settings.set(MODULE_CONFIG.NAME, "statusEffects", statusEffects);
    }
}
