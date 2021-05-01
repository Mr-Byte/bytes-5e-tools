import { cloneDeep } from 'lodash-es';
import { Effects } from './Effects';
import { Footer } from './Footer';
import { Header } from './Header';
import { keyElements } from '../../../../common/react/keyed';
import { modKey } from '../../../../config';
import { StatusEffect } from '../../types';
import { useRef, useState } from 'react';
import { useTranslation } from '../../../../common/react/hooks';
import './style.less';

export interface SettingsFormProps {
    statusEffects: StatusEffect[];
    defaultStatusEffects: StatusEffect[];
}

function useTranslations() {
    const resetDefaultsLabel = useTranslation(modKey("label.reset-defaults"));
    const resetWarningText = useTranslation(modKey("active-status-effects.settings.reset-warning"));
    const newEffectLabel = useTranslation(modKey("active-status-effects.settings.label.status-effect-new"));
    const okLabel = useTranslation(modKey("label.ok"));
    const cancelLabel = useTranslation(modKey("label.cancel"));

    return {
        resetDefaultsLabel,
        resetWarningText,
        newEffectLabel,
        okLabel,
        cancelLabel,
    }
}

export function SettingsForm(props: SettingsFormProps) {
    const { resetDefaultsLabel, resetWarningText, newEffectLabel, okLabel, cancelLabel, } = useTranslations();
    const [statusEffects, setStatusEffects,] = useState(keyElements(props.statusEffects));
    const scrollToEndRef = useRef(false);

    const onAddStatusEffect = () => {
        setStatusEffects((statusEffects) => [
            ...statusEffects,
            {
                id: randomID(),
                label: newEffectLabel,
                icon: "icons/svg/aura.svg",
                key: randomID(),
            },
        ]);

        scrollToEndRef.current = true;
    };

    const onDeleteStatusEffect = (index: number) => {
        setStatusEffects(statusEffects => statusEffects.filter((_, i) => i !== index));
    };

    const onResetStatusEffects = () => {
        const dialog = new Dialog({
            title: resetDefaultsLabel,
            content: resetWarningText,
            buttons: {
                ok: {
                    label: okLabel,
                    callback: () => {
                        setStatusEffects(keyElements(cloneDeep(props.defaultStatusEffects)));
                    },
                },
                cancel: {
                    label: cancelLabel,
                },
            },
            default: "cancel",
        });

        dialog.render(true);
    }

    return (
        <div className="b5e:active-status-effect-settings">
            <Header onAddStatusEffect={onAddStatusEffect} />
            <Effects statusEffects={statusEffects} onDelete={onDeleteStatusEffect} scrollToEndRef={scrollToEndRef} />
            <Footer onResetStatusEffects={onResetStatusEffects} />
        </div>
    );
}

