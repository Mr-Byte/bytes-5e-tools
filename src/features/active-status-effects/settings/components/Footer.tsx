import { modKey } from "../../../../config";
import { useTranslation } from "../../../../common/hooks";
import { Button, ButtonType } from "../../../../common/components";

export interface FooterProps {
    onResetStatusEffects?: () => void;
}

export function Footer({ onResetStatusEffects }: FooterProps) {
    const saveChangesLabel = useTranslation(modKey("save-changes-label"));
    const resetDefaultsLabel = useTranslation(modKey("reset-defaults-label"));

    return (
        <footer>
            <Button type={ButtonType.Submit} icon="fa-save">
                {saveChangesLabel}
            </Button>

            <Button type={ButtonType.Button} icon="fa-undo" onClick={onResetStatusEffects}>
                {resetDefaultsLabel}
            </Button>
        </footer>
    );
}
