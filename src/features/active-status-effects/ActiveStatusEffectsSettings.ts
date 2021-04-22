import type { StatusEffect } from ".";

import { modKey, MODULE_CONFIG, template } from "../../config";
import set from "lodash.set";

interface Data {
    statusEffects: StatusEffect[];
}

type TriggeredEvent = JQuery.TriggeredEvent<unknown, unknown, HTMLElement>;

export class ActiveStatusEffectsSettings extends FormApplication<FormApplication.Options, Data> {
    private static defaultStatusEffects: StatusEffect[];
    #statusEffects: StatusEffect[];

    constructor(object?: Data, options?: FormApplication.Options) {
        super(object, options);

        this.#statusEffects = duplicate(CONFIG.statusEffects);
    }

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

    public activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find(".status-effect-control").on("click", this.onStatusEffectControlClick.bind(this));
        html.find(".status-effect-name").on("click", this.onStatusEffectSettingsToggleClick.bind(this));
        html.find(".status-effects-reset").on("click", this.onStatusEffectsResetClick.bind(this));
        html.find(".status-effect-tab").on("click", this.onTabClick.bind(this));
    }

    private onStatusEffectControlClick(event: TriggeredEvent) {
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

    private onStatusEffectSettingsToggleClick(event: TriggeredEvent) {
        event.preventDefault();
        const toggleLink = event.currentTarget;
        const settings = toggleLink.closest(".status-effect")?.querySelector<HTMLElement>(".status-effect-settings");

        if (settings) {
            settings.style.display = settings.style.display === "none" ? "block" : "none";
        }
    }

    private onStatusEffectsResetClick() {
        const dialog = new Dialog({
            title: "Reset Defaults",
            content: "<p>Are you sure you want to discard all changes and reset to the default status effects?</p>",
            buttons: {
                ok: {
                    label: "Ok",
                    callback: () => {
                        this.#statusEffects = duplicate(ActiveStatusEffectsSettings.defaultStatusEffects);
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

    private onTabClick(_event: TriggeredEvent) {
        //
    }
}
