import React from "react";


export function whenChanged<E extends HTMLInputElement | HTMLSelectElement>(handler: (_value: string) => void): React.ChangeEventHandler<E> {
    return (event: React.ChangeEvent<E>) => handler(event.target.value);
}
