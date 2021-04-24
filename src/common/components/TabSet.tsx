export interface TabSetProps {
    children: React.ReactElement<TabProps>[];
}

export function TabSet({ children }: TabSetProps) {
    return (
        <div className="b5e-tabs">
            {children}
        </div>
    );
}

export interface TabProps {
    children: React.ReactNode;
}

export function Tab(_props: TabProps) {
    return <> </>;
}