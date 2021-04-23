import "./style.less";

import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import StatusEffectItem from "./StatusEffectItem";
import { StatusEffect } from "../../features/active-status-effects/types";

export interface Props {
    statusEffects: StatusEffect[];
    defaultStatusEffects: StatusEffect[];
}

export default function View(props: Props) {
    const [state, _setState] = useState(props.statusEffects);

    return (
        <div className="active-status-effect-settings">
            <Header />

            <div className="status-effects-container">
                {
                    // @ts-ignore For whatever reason, this is broken in TS 4.1
                    state.map((statusEffect, index) => <StatusEffectItem {...statusEffect} index={index} key={statusEffect.id} />)
                }
            </div>

            <Footer />
        </div>
    );
}
