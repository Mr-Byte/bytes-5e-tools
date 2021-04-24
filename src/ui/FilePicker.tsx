import { useEffect, useRef, useState } from 'react';
import { localize } from './localization';

interface FilePickerProps {
    id: string;
    type: string;
    value: string;
    onChange?: (_file: string) => void;
}

export default function ({ id, type, value, onChange }: FilePickerProps) {
    const [tooltip] = useState(localize("FILES.BrowseTooltip"));
    const [file, setFile] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const current = inputRef.current;
        if (current) {
            current.onchange = (event: Event) => {
                const newFile = (event.target as HTMLInputElement)?.value ?? "";
                setFile(newFile);
                onChange?.(newFile);
            }
        }
    }, [inputRef, onChange]);

    useEffect(() => {
        const current = buttonRef.current;

        if (current) {
            const filePicker = FilePicker.fromButton(current);
            current.onclick = () => filePicker.browse();
        }
    }, [buttonRef]);

    return (
        <>
            <input type="text" id={id} name={id} value={file} ref={inputRef} />
            {
                game.world && game.user?.can("FILES_BROWSE")
                    ? (
                        <button
                            ref={buttonRef}
                            type="button"
                            className="file-picker"
                            data-type={type}
                            data-target={id}
                            title={tooltip}
                            tabIndex={-1}
                        >
                            <i className="fas fa-file-import fa-fw"></i>
                        </button>
                    )
                    : null
            }
        </>
    );
}

