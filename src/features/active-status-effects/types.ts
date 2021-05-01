export interface StatusEffect {
    id: string;
    icon: string;
    label: string;
    changes?: ActiveEffect.Change[];
}
