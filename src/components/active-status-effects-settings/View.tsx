import "./style.less";

import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import StatusEffectItem from "./StatusEffectItem";
import { StatusEffect } from "../../features/active-status-effects/types";
import { usePrevious } from "../../ui/util";

export interface Props {
    statusEffects: StatusEffect[];
    defaultStatusEffects: StatusEffect[];
}

export default function View(props: Props) {
    const [statusEffects, setStatusEffects] = useState(props.statusEffects);
    const previousStatusEffects = usePrevious(statusEffects);
    const statusEffectsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previousLength = previousStatusEffects?.length ?? statusEffects.length;

        if (statusEffects.length > previousLength) {
            statusEffectsContainerRef.current?.scrollTo({ top: statusEffectsContainerRef.current?.scrollHeight, behavior: "smooth" });
        }
    }, [statusEffects]);

    const onAddStatusEffect = () => {
        setStatusEffects([
            ...statusEffects,
            {
                id: randomID(),
                label: "New Effect",
                icon: "icons/svg/aura.svg"
            }
        ]);
    };

    const onDeleteStatusEffect = (index: number) => {
        setStatusEffects(statusEffects.filter((_, i) => i !== index));
    };

    return (
        <div className="active-status-effect-settings">
            <Header onAddStatusEffect={onAddStatusEffect} />

            <div className="status-effects-container" ref={statusEffectsContainerRef}>
                {
                    // @ts-ignore For whatever reason, this is broken in TS 4.1
                    statusEffects.map((statusEffect, index) =>
                        <StatusEffectItem {...statusEffect}
                            index={index}
                            key={statusEffect.id}
                            onDeleteStatusEffect={onDeleteStatusEffect}
                        />
                    )
                }
                <div style={{ height: "10px" }}></div>
            </div>

            <Footer />
        </div>
    );
}
