import { modKey, MODULE_CONFIG, template } from "../../config";
import set from "lodash.set";

type StatusEffects = typeof CONFIG.statusEffects;

interface Data {
    statusEffects: StatusEffects;
}

export class ActiveStatusEffectsSettings extends FormApplication<FormApplication.Options, Data> {
    private static defaultStatusEffects: StatusEffects;
    #statusEffects: StatusEffects;

    constructor(object?: Data, options?: FormApplication.Options) {
        super(object, options);

        this.#statusEffects = duplicate(CONFIG.statusEffects);
    }

    public static init(defaultStatusEffects: StatusEffects): void {
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
        const statusEffects = this.#statusEffects.map(statusEffect => ({
            ...statusEffect,
            icon: statusEffect.icon.split("#")[0]
        }));

        return {
            statusEffects
        };
    }

    public activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find(".status-effect-control").on("click", this.onStatusEffectControl.bind(this));
        html.find(".status-effect-name").on("click", this.onToggleStatusEffectSettings.bind(this));
        html.find(".status-effects-reset").on("click", this.onReset.bind(this));
    }

    private onStatusEffectControl(event: JQuery.TriggeredEvent<unknown, unknown, HTMLElement>) {
        event.preventDefault();
        const button = event.currentTarget;

        switch (button.dataset.action) {
            case "create": {
                this.createEffect();
                return;
            }
            case "delete": {
                this.deleteEffect(button);
                return;
            }
        }
    }

    private onToggleStatusEffectSettings(event: JQuery.TriggeredEvent<unknown, unknown, HTMLElement>) {
        event.preventDefault();
        const toggleLink = event.currentTarget;
        const settings = toggleLink.closest(".status-effect")?.querySelector<HTMLElement>(".status-effect-settings");

        if (settings) {
            settings.style.display = settings.style.display === "none" ? "block" : "none";
        }
    }

    private onReset() {
        const dialog = new Dialog({
            title: "Reset Defaults",
            content: "<p>Are you sure you want to discard all changes and reset to the default status effects?</p>",
            buttons: {
                ok: {
                    label: "Ok",
                    callback: () => {
                        this.#statusEffects = ActiveStatusEffectsSettings.defaultStatusEffects;
                        this.render();
                    }
                },
                cancel: {
                    label: "Cancel"
                }
            },
            default: "cancel"
        });

        dialog.render(true);
    }

    private createEffect() {
        this.#statusEffects.push({
            id: randomID(),
            label: "New Effect",
            icon: "icons/svg/aura.svg"
        });
        this.render();
    }

    private deleteEffect(eventTarget: HTMLElement) {
        const statusEffectContainer = eventTarget.closest<HTMLElement>(".status-effect");
        const effectId = statusEffectContainer?.dataset.effectId;

        this.#statusEffects = this.#statusEffects.filter(effect => effect.id !== effectId);
        this.render();
    }

    protected async _updateObject(_event: Event, formData?: Record<string, unknown>): Promise<void> {
        if (!formData) {
            return;
        }

        const statusEffects: StatusEffects = Object.entries(formData)
            .reduce((statusEffects, [path, value]) => set(statusEffects, path, value), []);

        for (const statusEffect of statusEffects) {
            statusEffect.icon = `${statusEffect.icon}#${statusEffect.id}`;
        }

        await game.settings.set(MODULE_CONFIG.NAME, "statusEffects", statusEffects);
    }
}
