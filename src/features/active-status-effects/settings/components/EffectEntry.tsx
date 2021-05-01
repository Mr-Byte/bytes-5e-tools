import { useMemo, useState } from "react";
import { useTranslation } from "../../../../common/react/hooks";
import { Icon, TabSet, Tab } from "../../../../common/components";
import { Details } from "./Details";
import { Changes } from "./Changes";
import { StatusEffect } from "../../types";
import { modKey } from "../../../../config";

export interface EffectEntryProps extends StatusEffect {
    index: number;
    onDelete?: (_index: number) => void;
}

export function EffectEntry({ id, label, icon, index, changes, onDelete: onDeleteStatusEffect, }: EffectEntryProps) {
    const effectChanges = useMemo(() => changes?.map(change => ({
        dataPath: change.key,
        mode: change.mode.toString(),
        value: (change.value as object)?.toString(),
    })), [changes,]);

    const [showDetails, setShowDetails,] = useState(false);
    const [statusEffectIcon, setStatusEffectIcon,] = useState(icon);
    const [statusEffectLabel, setStatusEffectLabel,] = useState(useTranslation(label));
    const deleteStatusEffectLabel = useTranslation(modKey("active-status-effects.settings.delete-label"));
    const toggleDetails = () => setShowDetails(!showDetails);

    return (
        <div className="b5e:status-effect">
            <img className="b5e:status-effect-icon" src={statusEffectIcon} onClick={toggleDetails} />
            <div className="b5e:status-effect-name" onClick={toggleDetails}>
                <h3>{statusEffectLabel}</h3>
            </div>
            <div className="b5e:status-effect-controls">
                <a title={deleteStatusEffectLabel} onClick={() => onDeleteStatusEffect?.(index)}>
                    <Icon icon="fa-trash" />
                </a>
            </div>

            <div className="b5e:status-effect-settings" data-visibility={showDetails ? "shown" : "hidden"}>
                <TabSet>
                    <Tab title="Details" icon="fa-book">
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
                        <Changes changes={effectChanges ?? []} path={`[${index}].changes`} />
                    </Tab>
                </TabSet>
            </div>
        </div>
    );
}