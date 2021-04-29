import { useState } from "react";
import { useTranslation } from "../../../../common/hooks";
import { Icon, FilePicker, TabSet, Tab } from "../../../../common/components";
import { modKey } from "../../../../config";

export interface StatusEffectProps {
    id: string;
    label: string;
    icon: string;
    index: number;
    onDeleteStatusEffect?: (_index: number) => void;
}

export function StatusEffectItem({ id, label, icon, index, onDeleteStatusEffect }: StatusEffectProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [statusEffectIcon, setStatusEffectIcon] = useState(icon);
    const [statusEffectLabel, setStatusEffectLabel] = useState(useTranslation(label));

    const statusEffectItemLabel = useTranslation(modKey("active-status-effects.settings.label.status-effect-label"));
    const statusEffectItemIcon = useTranslation(modKey("active-status-effects.settings.label.status-effect-icon"));

    const toggleDetails = () => setShowDetails(!showDetails);

    const updateStatusEffectLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const value = event.target.value;
        console.log(value);

        setStatusEffectLabel(value);
    };

    return (
        <div className="b5e:status-effect">
            <img className="b5e:status-effect-icon" src={statusEffectIcon} onClick={toggleDetails} />
            <div className="b5e:status-effect-name" onClick={toggleDetails}>
                <h3>{statusEffectLabel}</h3>
            </div>
            <div className="b5e:status-effect-controls">
                <a title="Delete Status Effect" onClick={() => onDeleteStatusEffect?.(index)}>
                    <Icon icon="fa-trash" />
                </a>
            </div>

            <div className="b5e:status-effect-settings" data-visibility={showDetails ? "shown" : "hidden"}>
                <TabSet>
                    <Tab title="Details" icon="fa-book" selected>
                        <div>
                            <input type="hidden" name={`[${index}].id`} value={id} />
                            <div className="form-group">
                                <label htmlFor={`[${index}].label`}>{statusEffectItemLabel}</label>
                                <div className="form-fields">
                                    <input
                                        name={`[${index}].label`}
                                        type="text"
                                        value={statusEffectLabel}
                                        onChange={updateStatusEffectLabel}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor={`[${index}].icon`}>{statusEffectItemIcon}</label>
                                <div className="form-fields">
                                    <FilePicker id={`[${index}].icon`} type="image" value={icon} onChange={setStatusEffectIcon} />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab title="Effects" icon="fa-cogs">
                        <div></div>
                    </Tab>
                </TabSet>
            </div>
        </div>
    );
}