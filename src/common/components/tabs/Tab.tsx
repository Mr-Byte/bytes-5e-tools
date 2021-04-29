export interface TabProps {
    children: React.ReactNode;
    title: string;
    icon?: string;
    selected?: boolean;
}

export function Tab({ children, selected }: TabProps) {
    return (
        <div className="b5e:tab-panel" data-selected={selected}>
            {children}
        </div>
    );
}