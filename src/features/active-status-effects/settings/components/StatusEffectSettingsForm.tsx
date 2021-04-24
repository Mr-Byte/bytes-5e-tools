import "./style.less";

import { useCallback, useEffect, useRef, useState } from "react";
import { StatusEffect } from "../../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StatusEffectItem } from "./StatusEffectItem";

export interface SettingsFormProps {
    statusEffects: StatusEffect[];
    defaultStatusEffects: StatusEffect[];
}

export function SettingsForm(props: SettingsFormProps) {
    const [statusEffects, setStatusEffects] = useState(props.statusEffects);
    const statusEffectsContainerRef = useRef<HTMLDivElement>(null);
    const scrollToEndRef = useRef(false);

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
                label: "New Effect",
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
        setStatusEffects(() => duplicate(props.defaultStatusEffects));
    }, []);

    const onResetStatusEffects = () => {
        // TODO: Can this be a hook of some sort?
        const dialog = new Dialog({
            title: "Reset Defaults",
            content: "<p>Are you sure you want to discard all changes and reset to the default status effects?</p>",
            buttons: {
                ok: {
                    label: "Ok",
                    callback: resetEffects
                },
                cancel: {
                    label: "Cancel"
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
