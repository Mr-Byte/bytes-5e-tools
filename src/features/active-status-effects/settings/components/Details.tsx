import { FilePicker } from '../../../../common/components';
import { modKey } from '../../../../config';
import { useTranslation } from '../../../../common/react/hooks';

export interface DetailsProps {
    id: string;
    label: string;
    icon: string;
    index: number;

    onLabelChange?: (_value: string) => void;
    onIconChange?: (_value: string) => void;
}

export function Details({ id, label, icon, index, onIconChange, onLabelChange, }: DetailsProps) {
    const statusEffectItemLabel = useTranslation(modKey("active-status-effects.settings.label.status-effect-label"));
    const statusEffectItemIcon = useTranslation(modKey("active-status-effects.settings.label.status-effect-icon"));

    return (
        <div>
            <input type="hidden" name={`[${index}].id`} value={id} />
            <div className="form-group">
                <label htmlFor={`[${index}].label`}>{statusEffectItemLabel}</label>
                <div className="form-fields">
                    <input
                        name={`[${index}].label`}
                        type="text"
                        value={label}
                        onChange={event => onLabelChange?.(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor={`[${index}].icon`}>{statusEffectItemIcon}</label>
                <div className="form-fields">
                    <FilePicker id={`[${index}].icon`} type="image" value={icon} onChange={onIconChange} />
                </div>
            </div>
        </div>
    );
}