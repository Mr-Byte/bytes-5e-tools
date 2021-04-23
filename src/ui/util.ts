import { useEffect, useRef } from "react";

export function localize(input: string) {
    return game.i18n.localize(input);
}

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}