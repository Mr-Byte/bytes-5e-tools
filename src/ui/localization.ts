export function localize(input: string): string {
    return game.i18n.localize(input);
}

export function format(key: string, data: Record<string, unknown>): string {
    return game.i18n.format(key, data);
}
