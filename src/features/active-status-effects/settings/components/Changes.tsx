import { useState } from "react";
import { Icon, IconType } from "../../../../common/components";
import { useTranslation } from "../../../../common/react/hooks";
import { Change, EffectChange } from "./Change";

export interface ChangesProps {
    formPath: string;
    changes: EffectChange[];
}

function useTranslations() {
    return {
        changeKey: useTranslation("EFFECT.ChangeKey"),
        changeMode: useTranslation("EFFECT.ChangeMode"),
        changeValue: useTranslation("EFFECT.ChangeValue"),
    }
}

export function Changes(props: ChangesProps) {
    const translations = useTranslations();
    const [changes, setChanges,] = useState(props.changes);
    const { formPath, } = props;

    const onAddNewChange = () => setChanges(changes => [...changes, {},]);
    const onDeleteChange = (index: number) => setChanges(change => change.filter((_, i) => i !== index));

    return (
        <div className="b5e:status-effect-changes">
            <header className="b5e:status-effect-change flexrow">
                <div className="key">{translations.changeKey}</div>
                <div className="mode">{translations.changeMode}</div>
                <div className="value">{translations.changeValue}</div>
                <div className="effect-controls">
                    <a className="effect-control" title="Add" onClick={onAddNewChange}>
                        <Icon icon="fa-plus-square" type={IconType.Inverted} />
                    </a>
                </div>
            </header>

            {
                // @ts-ignore jsaSuffer
                changes.map((change, index) =>
                    <Change
                        path={`${formPath}[${index}]`}
                        attributeKey={change.attributeKey}
                        mode={change.mode}
                        value={change.value}
                        onDelete={() => onDeleteChange(index)}
                    />
                )
            }
        </div>
    );
}


