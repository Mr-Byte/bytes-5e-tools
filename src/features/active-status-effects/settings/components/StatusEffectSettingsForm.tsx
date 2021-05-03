import * as types from '../../types';
import { cloneDeep } from 'lodash-es';
import { Footer } from './Footer';
import { Header } from './Header';
import { StatusEffect } from './StatusEffect';
import { keyElements } from '../../../../common/react/keyed';
import { modKey } from '../../../../config';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../../../common/react/hooks';
import { TitleBarPortal } from '../../../../common/components/TitleBarPortal';
import { Label } from '../../../../common/components';

import './style.less';

export interface SettingsFormProps {
    statusEffects: types.StatusEffect[];
    defaultStatusEffects: types.StatusEffect[];
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
    const statusEffectsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollToEndRef.current) {
            const current = statusEffectsContainerRef.current;

            current?.scrollTo({
                top: current?.scrollHeight,
                behavior: "smooth",
            });

            scrollToEndRef.current = false;
        }
    });

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

    const onDeleteStatusEffect = (index: number) =>
        () => setStatusEffects(statusEffects => statusEffects.filter((_, i) => i !== index));

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
            <TitleBarPortal parentId="ActiveStatusEffectsSettings">
                <a>
                    <Label icon="fa-file-import">Import</Label>
                </a>
                <a>
                    <Label icon="fa-file-export">Export</Label>
                </a>
            </TitleBarPortal>

            <Header onAddStatusEffect={onAddStatusEffect} />

            <div className="b5e:status-effects-container" ref={statusEffectsContainerRef}>
                {
                    // @ts-ignore For whatever reason, this is broken in TS 4.1
                    statusEffects.map((statusEffect, index) =>
                        <StatusEffect {...statusEffect}
                            formPath={`[${index}]`}
                            key={statusEffect.key}
                            onDelete={onDeleteStatusEffect(index)}
                        />
                    )
                }
                <div style={{ height: "10px", }}></div>
            </div>

            <Footer onResetStatusEffects={onResetStatusEffects} />
        </div>
    );
}

