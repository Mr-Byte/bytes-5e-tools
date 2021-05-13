import { Label } from "common/components/controls/Label";

export const enum ButtonType {
    // eslint-disable-next-line no-unused-vars
    Submit = "submit",
    // eslint-disable-next-line no-unused-vars
    Button = "button"
}

export interface ButtonProps {
    type: ButtonType;
    name?: string;
    icon?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export function Button({ type, name, icon, children, onClick, }: ButtonProps) {
    return (
        <button type={type} name={name} onClick={onClick}>
            <Label icon={icon}>
                {children}
            </Label>
        </button>
    );
}