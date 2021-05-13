import React, { useMemo, useState } from "react";
import { TabProps } from "common/components/controls/tabs";
import { Label } from "common/components/controls/Label";

import "./tabs.less";

export interface TabSetProps {
    defaultTabIndex?: number;
    children: React.ReactElement<TabProps>[];
}

export function TabSet({ children, defaultTabIndex, }: TabSetProps) {
    const [selectedTab, setSelectedTab,] = useState(defaultTabIndex ?? 0);
    const [tabs, panels,] = useMemo(() => [
        children.map(({ props: { title, icon, }, }, index) =>
            <Label className="b5e:tab-item" key={title} icon={icon} data-selected={selectedTab === index} onClick={() => setSelectedTab(index)}>{title}</Label>
        ),
        children.map((child, index) => {
            return (
                <div className="b5e:tab-panel" data-selected={selectedTab === index}>
                    {child}
                </div>
            )
        }),
    ], [children, selectedTab,]);

    return (
        <div className="b5e:tab-set">
            <div className="b5e:tab-item-list">
                {tabs}
            </div>

            {panels}
        </div>
    );
}
