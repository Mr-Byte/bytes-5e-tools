import { useState } from "react";
import { Icon } from "common/components/controls/Icon";
import { useTranslation } from "common/react/hooks";
import { whenChanged } from "common/react/whenChanged";

export interface ChangeProps extends EffectChange {
    path: string;
    onDelete?: () => void;
}

export interface EffectChange {
    attributeKey?: string;
    mode?: string;
    value?: string;
}

export function useTranslations() {
    return {
        effectModeCustom: useTranslation("EFFECT.MODE_CUSTOM"),
        effectModeMultiply: useTranslation("EFFECT.MODE_MULTIPLY"),
        effectModeAdd: useTranslation("EFFECT.MODE_ADD"),
        effectModeDowngrade: useTranslation("EFFECT.MODE_DOWNGRADE"),
        effectModeUpgrade: useTranslation("EFFECT.MODE_UPGRADE"),
        effectModeOverride: useTranslation("EFFECT.MODE_OVERRIDE"),
        delete: useTranslation("Delete"),
    }
}

export function Change(props: ChangeProps) {
    const [attributeKey, setAttributeKey,] = useState(props.attributeKey);
    const [mode, setMode,] = useState(props.mode);
    const [value, setValue,] = useState(props.value);
    const { path, } = props;
    const translations = useTranslations();

    return (
        <div className="b5e:status-effect-change flexrow">
            <div className="key">
                <input name={`${path}.key`} type="text" value={attributeKey} onChange={whenChanged(setAttributeKey)} />
            </div>
            <div className="mode">
                <select name={`${path}.mode`} value={mode} onChange={whenChanged(setMode)}>
                    <option value={CONST.ACTIVE_EFFECT_MODES.CUSTOM}>{translations.effectModeCustom}</option>
                    <option value={CONST.ACTIVE_EFFECT_MODES.MULTIPLY}>{translations.effectModeMultiply}</option>
                    <option value={CONST.ACTIVE_EFFECT_MODES.ADD} selected>{translations.effectModeAdd}</option>
                    <option value={CONST.ACTIVE_EFFECT_MODES.DOWNGRADE}>{translations.effectModeDowngrade}</option>
                    <option value={CONST.ACTIVE_EFFECT_MODES.UPGRADE}>{translations.effectModeUpgrade}</option>
                    <option value={CONST.ACTIVE_EFFECT_MODES.OVERRIDE}>{translations.effectModeOverride}</option>
                </select>
            </div>
            <div className="value">
                <input name={`${path}.value`} type="text" value={value} onChange={whenChanged(setValue)} />
            </div>
            <div className="effect-controls">
                <a title={translations.delete} onClick={() => props.onDelete?.()}>
                    <Icon icon="fa-trash" />
                </a>
            </div>
        </div>
    );
}
