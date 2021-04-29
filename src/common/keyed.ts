export type Keyed<T> = T & { key: string };

export function keyElements<T>(input: T[]): (T & { key: string })[] {
    return input.map(item => ({ ...item, key: randomID() }));
}