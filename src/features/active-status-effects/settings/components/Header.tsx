import Label from "../../../../common/components/Label";
import { useTranslation } from "../../../../common/hooks";
import { modKey } from "../../../../config";

export interface HeaderProps {
    onAddStatusEffect?: () => void;
}

export function Header({ onAddStatusEffect }: HeaderProps) {
    const createStatusEffectLabel = useTranslation(modKey("active-status-effects.settings.create-label"));
    const addButonLabel = useTranslation(modKey("label.add"));
    const headerLabel = useTranslation(modKey("active-status-effects.settings.name"));

    return (
        <header>
            <h2>{headerLabel}</h2>
            <a className="status-effect-control" title={createStatusEffectLabel} onClick={onAddStatusEffect}>
                <h2>
                    <Label icon="fa-plus">{addButonLabel}</Label>
                </h2>
            </a>
        </header>
    );
}
