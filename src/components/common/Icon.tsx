export interface IconProps {
    icon?: string;
}

export default function Icon({ icon }: IconProps) {
    return icon ? <i className={`fas ${icon}`}></i > : null;
}
