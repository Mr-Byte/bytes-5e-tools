export interface IconProps {
    icon: string;
    type?: string;
}

export const enum IconType {
    // eslint-disable-next-line no-unused-vars
    Normal = "fas",
    // eslint-disable-next-line no-unused-vars
    Inverted = "far"
}

export function Icon({ icon, type, }: IconProps) {
    return <i className={`${type ?? IconType.Normal} ${icon}`}></i >;
}
