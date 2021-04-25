import "./style.less";

import { useCallback, useEffect, useRef, useState } from "react";
import { StatusEffect } from "../../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StatusEffectItem } from "./StatusEffectItem";
import { cloneDeep } from "lodash-es";
import { useTranslation } from "../../../../common/hooks";
import { modKey } from "../../../../config";

export interface SettingsFormProps {
    statusEffects: StatusEffect[];
    defaultStatusEffects: StatusEffect[];
}

export function SettingsForm(props: SettingsFormProps) {
    const [statusEffects, setStatusEffects] = useState(props.statusEffects);
    const statusEffectsContainerRef = useRef<HTMLDivElement>(null);
    const scrollToEndRef = useRef(false);

    const resetDefaultsLabel = useTranslation(modKey("label.reset-defaults"));
    const resetWarningText = useTranslation(modKey("active-status-effects.settings.reset-warning"));
    const newEffectLabel = useTranslation(modKey("active-status-effects.settings.label.status-effect-new"));
    const okLabel = useTranslation(modKey("label.ok"));
    const cancelLabel = useTranslation(modKey("label.cancel"));

    useEffect(() => {
        if (scrollToEndRef.current) {
            const current = statusEffectsContainerRef.current;

            current?.scrollTo({
                top: current?.scrollHeight,
                behavior: "smooth"
            });

            scrollToEndRef.current = false;
        }
    }, [scrollToEndRef.current]);

    const onAddStatusEffect = () => {
        setStatusEffects((statusEffects) => [
            ...statusEffects,
            {
                id: randomID(),
                label: newEffectLabel,
                icon: "icons/svg/aura.svg"
            }
        ]);

        scrollToEndRef.current = true;
    };

    const onDeleteStatusEffect = (index: number) => {
        setStatusEffects(statusEffects => statusEffects.filter((_, i) => i !== index));
    };

    const resetEffects = useCallback(() => {
        // Minor hack to force refresh the list of effects even if the count didn't change.
        setStatusEffects(() => []);
        setStatusEffects(() => cloneDeep(props.defaultStatusEffects));
    }, []);

    const onResetStatusEffects = () => {
        // TODO: Can this be a hook of some sort?
        const dialog = new Dialog({
            title: resetDefaultsLabel,
            content: resetWarningText,
            buttons: {
                ok: {
                    label: okLabel,
                    callback: resetEffects
                },
                cancel: {
                    label: cancelLabel
                }
            },
            default: "cancel"
        });

        dialog.render(true);
    }

    return (
        <div className="active-status-effect-settings">
            <Header onAddStatusEffect={onAddStatusEffect} />

            <div className="status-effects-container" ref={statusEffectsContainerRef}>
                {
                    // @ts-ignore For whatever reason, this is broken in TS 4.1
                    statusEffects.map((statusEffect, index) =>
                        <StatusEffectItem {...statusEffect}
                            index={index}
                            key={statusEffect.id}
                            onDeleteStatusEffect={onDeleteStatusEffect}
                        />
                    )
                }
                <div style={{ height: "10px" }}></div>
            </div>

            <Footer onResetStatusEffects={onResetStatusEffects} />
        </div>
    );
}
