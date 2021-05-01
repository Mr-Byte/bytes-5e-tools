import { Icon, IconType } from "../../../../common/components";
import { Change, EffectChange } from "./Change";

export interface ChangesProps {
    path: string;
    changes: EffectChange[];
}

export function Changes({ path, changes, }: ChangesProps) {
    return (
        <div className="b5e:status-effect-changes">
            <header className="b5e:status-effect-change flexrow">
                <div className="key">Attribute Key</div>
                <div className="mode">Change Mode</div>
                <div className="value">Effect Value</div>
                <div className="effect-controls">
                    <a className="effect-control" title="Add">
                        <Icon icon="fa-plus-square" type={IconType.Inverted} />
                    </a>
                </div>
            </header>

            {
                // @ts-ignore jsaSuffer
                changes.map((change, index) =>
                    <Change
                        path={`${path}[${index}]`}
                        attributeKey={change.attributeKey}
                        mode={change.mode}
                        value={change.value}
                    />
                )
            }

        </div>
    );
}


