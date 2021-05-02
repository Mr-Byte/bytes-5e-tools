import { useMemo, useState } from "react";
import { useTranslation } from "../../../../common/react/hooks";
import { Icon, TabSet, Tab } from "../../../../common/components";
import { Details } from "./Details";
import { Changes } from "./Changes";
import { StatusEffect } from "../../types";
import { modKey } from "../../../../config";

export interface EffectEntryProps extends StatusEffect {
    formPath: string;
    onDelete?: () => void;
}

export function StatusEffect({ id, label, icon, changes, formPath, onDelete, }: EffectEntryProps) {
    const [showDetails, setShowDetails,] = useState(false);
    const [statusEffectIcon, setStatusEffectIcon,] = useState(icon);
    const [statusEffectLabel, setStatusEffectLabel,] = useState(useTranslation(label));
    const deleteStatusEffectLabel = useTranslation(modKey("active-status-effects.settings.delete-label"));
    const effectChanges = useMemo(() => changes?.map(change => ({
        attributeKey: change.key,
        mode: change.mode.toString(),
        value: (change.value as object)?.toString(),
    })), [changes,]);

    const toggleDetails = () => setShowDetails(!showDetails);

    return (
        <div className="b5e:status-effect">
            <a className="b5e:status-effect-header" onClick={toggleDetails}>
                <img className="b5e:status-effect-icon" src={statusEffectIcon} />
                <h3 className="b5e:status-effect-name">{statusEffectLabel}</h3>
            </a>
            <div className="b5e:status-effect-controls">
                <a title={deleteStatusEffectLabel} onClick={() => onDelete?.()}>
                    <Icon icon="fa-trash" />
                </a>
            </div>

            <div className="b5e:status-effect-settings" data-visibility={showDetails ? "shown" : "hidden"}>
                <TabSet>
                    <Tab title="Details" icon="fa-book">
                        <Details
                            id={id}
                            label={statusEffectLabel}
                            icon={statusEffectIcon}
                            formPath={formPath}
                            onIconChange={setStatusEffectIcon}
                            onLabelChange={setStatusEffectLabel}
                        />
                    </Tab>
                    <Tab title="Effects" icon="fa-cogs">
                        <Changes changes={effectChanges ?? []} formPath={`${formPath}.changes`} />
                    </Tab>
                </TabSet>
            </div>
        </div>
    );
}