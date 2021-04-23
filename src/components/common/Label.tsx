import Icon from "./Icon";

export interface LabelProps {
    icon?: string;
    children?: React.ReactNode;
}

export default function Label({ icon, children }: LabelProps) {
    return (
        <>
            {icon ? <Icon icon={icon} /> : null}{children}
        </>
    );
}
