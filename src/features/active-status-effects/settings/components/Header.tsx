import { Label } from "common/components/controls/Label";
import { modKey } from "config";
import { useTranslation } from "common/react/hooks";

export interface HeaderProps {
    onAddStatusEffect?: () => void;
}

export function Header({ onAddStatusEffect, }: HeaderProps) {
    const createStatusEffectLabel = useTranslation(modKey("active-status-effects.settings.create-label"));
    const addButonLabel = useTranslation(modKey("label.add"));
    const headerLabel = useTranslation(modKey("active-status-effects.settings.name"));

    return (
        <header className="b5e:active-status-effect-settings-header">
            <h2>{headerLabel}</h2>
            <a className="b5e:status-effect-control" title={createStatusEffectLabel} onClick={onAddStatusEffect}>
                <h2>
                    <Label icon="fa-plus">{addButonLabel}</Label>
                </h2>
            </a>
        </header>
    );
}
