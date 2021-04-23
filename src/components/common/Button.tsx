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
}

export default function Button({ type, name, icon, children }: ButtonProps) {
    return (
        <button type={type} name={name}>
            <Label icon={icon}>
                {children}
            </Label>
        </button>
    );
}