import Label from "./Label";

export const enum ButtonType {
    Submit = "submit",
    Button = "button"
}

export interface ButtonProps {
    type: ButtonType;
    name?: string;
    icon?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ type, name, icon, children, onClick }: ButtonProps) {
    return (
        <button type={type} name={name} onClick={onClick}>
            <Label icon={icon}>
                {children}
            </Label>
        </button>
    );
}