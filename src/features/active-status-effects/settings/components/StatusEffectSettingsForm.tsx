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
    const yes = useTranslation("Yes");
    const no = useTranslation("No");

    return {
        resetDefaultsLabel,
        resetWarningText,
        newEffectLabel,
        yes,
        no,
    }
}

export function SettingsForm(props: SettingsFormProps) {
    const translations = useTranslations();
    const [statusEffects, setStatusEffects,] = useState(keyElements(props.statusEffects));
    const scrollToEndRef = useRef(false);

    const onAddStatusEffect = () => {
        setStatusEffects((statusEffects) => [
            ...statusEffects,
            {
                id: randomID(),
                label: translations.newEffectLabel,
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
            title: translations.resetDefaultsLabel,
            content: translations.resetWarningText,
            buttons: {
                yes: {
                    label: translations.yes,
                    callback: () => {
                        setStatusEffects(keyElements(cloneDeep(props.defaultStatusEffects)));
                    },
                },
                no: {
                    label: translations.no,
                },
            },
            default: "no",
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

