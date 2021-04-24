import { useState } from "react";
import FilePicker from "../../ui/FilePicker";
import { useTranslation } from "../../ui/hooks";
import Icon from "../common/Icon";

export interface StatusEffectProps {
    id: string;
    label: string;
    icon: string;
    index: number;
    onDeleteStatusEffect?: (_index: number) => void;
}

export default function StatusEffect({ id, label, icon, index, onDeleteStatusEffect }: StatusEffectProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [statusEffectLabel, setStatusEffectLabel] = useState(useTranslation(label));
    const [statusEffectIcon, setStatusEffectIcon] = useState(icon);
    const toggleDetails = () => setShowDetails(!showDetails);

    return (
        <div className="status-effect">
            <img className="status-effect-icon" src={statusEffectIcon} onClick={toggleDetails} />
            <div className="status-effect-name" onClick={toggleDetails}>
                <h3>{statusEffectLabel}</h3>
            </div>
            <div className="status-effect-controls">
                <a title="Delete Status Effect" onClick={() => onDeleteStatusEffect?.(index)}>
                    <Icon icon="fa-trash" />
                </a>
            </div>

            <div className="status-effect-settings" data-visibility={showDetails ? "shown" : "hidden"}>
                <div>
                    <input type="hidden" name={`[${index}].id`} value={id} />
                    <div className="form-group">
                        <label htmlFor={`[${index}].label`}>Status Effect Label</label>
                        <div className="form-fields">
                            <input
                                name={`[${index}].label`}
                                type="text"
                                value={statusEffectLabel}
                                onChange={event => setStatusEffectLabel(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`[${index}].icon`}>Status Effect Icon</label>
                        <div className="form-fields">
                            <FilePicker id={`[${index}].icon`} type="image" value={icon} onChange={setStatusEffectIcon}></FilePicker>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}