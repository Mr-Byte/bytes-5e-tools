import React, { useEffect, useState } from "react";
import { TabProps } from "./Tab";
import { Label } from "../";
import "./tabs.less";

export interface TabSetProps {
    children: React.ReactElement<TabProps>[];
}

export function TabSet({ children }: TabSetProps) {
    const [selectedTab, setSelectedTab] = useState(children.findIndex(element => element.props.selected));
    const [tabs, setTabs] = useState(children);

    useEffect(() => {
        const newTabs = React.Children.map(tabs, (child, index) => {
            if (React.isValidElement(child)) {
                const newProps = { ...child.props, selected: index === selectedTab };
                return React.cloneElement(child, newProps);
            }

            return child;
        });

        setTabs(newTabs);
    }, [selectedTab]);

    // @ts-ignore This is broken in TS 4.1.
    const tabItems = tabs.map(({ props: { title, icon, selected } }, index) =>
        <Label className="b5e:tab-item" key={title} icon={icon} data-selected={selected} onClick={() => setSelectedTab(index)}>{title}</Label>
    );

    return (
        <div className="b5e:tab-set">
            <div className="b5e:tab-item-list">
                {tabItems}
            </div>

            {tabs}
        </div>
    );
}
