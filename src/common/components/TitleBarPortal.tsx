import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import "./title-bar.less";

export interface TitleBarPortalProps {
    parentId: string;
    children?: React.ReactNode;
}

export function TitleBarPortal({ parentId, children, }: TitleBarPortalProps) {
    const [container,] = useState(document.createElement("div"));
    container.classList.add("b5e:application-title-controls");

    useEffect(() => {
        const header = document.getElementById(parentId)?.getElementsByTagName("header")?.[0];
        const title = header?.getElementsByTagName("h4")?.[0];

        header?.insertBefore(container, title?.nextElementSibling ?? null);

        return () => {
            document.body.removeChild(container);
        };
    }, [container, parentId,]);

    return ReactDOM.createPortal(children, container);
}
