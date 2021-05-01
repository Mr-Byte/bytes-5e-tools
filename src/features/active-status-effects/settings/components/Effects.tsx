import { EffectEntry } from './EffectEntry';
import { Keyed } from '../../../../common/react/keyed';
import { MutableRefObject, useEffect, useRef } from 'react';
import { StatusEffect } from '../../types';

export interface EffectsProps {
    statusEffects: Keyed<StatusEffect>[];
    scrollToEndRef: MutableRefObject<boolean>;
    onDelete?: (_index: number) => void;
}

export function Effects({ statusEffects, scrollToEndRef, onDelete, }: EffectsProps) {
    const statusEffectsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollToEndRef.current) {
            const current = statusEffectsContainerRef.current;

            current?.scrollTo({
                top: current?.scrollHeight,
                behavior: "smooth",
            });

            scrollToEndRef.current = false;
        }
    });

    return (
        <div className="b5e:status-effects-container" ref={statusEffectsContainerRef}>
            {
                // @ts-ignore For whatever reason, this is broken in TS 4.1
                statusEffects.map((statusEffect, index) =>
                    <EffectEntry {...statusEffect}
                        index={index}
                        key={statusEffect.key}
                        onDelete={onDelete}
                    />
                )
            }
            <div style={{ height: "10px", }}></div>
        </div>
    );
}
