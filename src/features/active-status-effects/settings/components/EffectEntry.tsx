import { useState } from "react";
import { useTranslation } from "../../../../common/hooks";
import { Icon, TabSet, Tab } from "../../../../common/components";
import { Details } from "./Details";

export interface EffectEntryProps {
    id: string;
    label: string;
    icon: string;
    index: number;
    onDelete?: (index: number) => void;
}

export function EffectEntry({ id, label, icon, index, onDelete: onDeleteStatusEffect }: EffectEntryProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [statusEffectIcon, setStatusEffectIcon] = useState(icon);
    const [statusEffectLabel, setStatusEffectLabel] = useState(useTranslation(label));

    const toggleDetails = () => setShowDetails(!showDetails);

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
                        <Details
                            id={id}
                            index={index}
                            label={statusEffectLabel}
                            icon={statusEffectIcon}
                            onIconChange={setStatusEffectIcon}
                            onLabelChange={setStatusEffectLabel}
                        />
                    </Tab>
                    <Tab title="Effects" icon="fa-cogs">
                        <div></div>
                    </Tab>
                </TabSet>
            </div>
        </div>
    );
}