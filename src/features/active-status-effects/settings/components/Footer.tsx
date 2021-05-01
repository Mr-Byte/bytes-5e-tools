import { Button, ButtonType } from '../../../../common/components';
import { modKey } from '../../../../config';
import { useTranslation } from '../../../../common/react/hooks';

export interface FooterProps {
    onResetStatusEffects?: () => void;
}

export function Footer({ onResetStatusEffects, }: FooterProps) {
    const saveChangesLabel = useTranslation(modKey("label.save-changes"));
    const resetDefaultsLabel = useTranslation(modKey("label.reset-defaults"));

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
