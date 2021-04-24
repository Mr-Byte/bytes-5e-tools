export interface IconProps {
    icon?: string;
}

export function Icon({ icon }: IconProps) {
    return icon ? <i className={`fas ${icon}`}></i > : null;
}
