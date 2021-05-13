import { useTranslation } from "common/react/hooks";
import { FilePicker } from "common/components/controls/FilePicker";

export interface DetailsProps {
    id: string;
    label: string;
    icon: string;
    formPath: string;

    onLabelChange?: (_value: string) => void;
    onIconChange?: (_value: string) => void;
}

export function Details({ id, label, icon, formPath, onIconChange, onLabelChange, }: DetailsProps) {
    const statusEffectItemLabel = useTranslation("EFFECT.Label");
    const statusEffectItemIcon = useTranslation("EFFECT.Icon");

    return (
        <div>
            <input type="hidden" name={`${formPath}.id`} value={id} />
            <div className="form-group">
                <label htmlFor={`${formPath}.label`}>{statusEffectItemLabel}</label>
                <div className="form-fields">
                    <input
                        name={`${formPath}.label`}
                        type="text"
                        value={label}
                        onChange={event => onLabelChange?.(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor={`${formPath}.icon`}>{statusEffectItemIcon}</label>
                <div className="form-fields">
                    <FilePicker id={`${formPath}.icon`} type="image" value={icon} onChange={onIconChange} />
                </div>
            </div>
        </div>
    );
}