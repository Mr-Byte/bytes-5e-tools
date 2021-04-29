import React, { useMemo, useState } from "react";
import { TabProps } from "./Tab";
import { Label } from "../";
import "./tabs.less";

export interface TabSetProps {
    defaultTabIndex?: number;
    children: React.ReactElement<TabProps>[];
}

export function TabSet({ children, defaultTabIndex }: TabSetProps) {
    const [selectedTab, setSelectedTab] = useState(defaultTabIndex ?? 0);
    const [tabs, panels] = useMemo(() => {
        const tabs = children.map(({ props: { title, icon } }, index) =>
            <Label className="b5e:tab-item" key={title} icon={icon} data-selected={selectedTab === index} onClick={() => setSelectedTab(index)}>{title}</Label>
        );
        const panels = children.map((child, index) => {
            return (
                <div className="b5e:tab-panel" data-selected={selectedTab === index}>
                    {child}
                </div>
            )
        });

        return [tabs, panels];
    }, [children, selectedTab]);

    return (
        <div className="b5e:tab-set">
            <div className="b5e:tab-item-list">
                {tabs}
            </div>

            {panels}
        </div>
    );
}
