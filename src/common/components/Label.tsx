import { Icon } from './Icon';

export interface LabelProps {
    icon?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function Label({ icon, children, ...rest }: LabelProps) {
    return (
        <span {...rest}>
            {
                icon
                    ? <>
                        <Icon icon={icon} />&nbsp;{children}
                    </>
                    : { children, }
            }
        </span>
    );
}
