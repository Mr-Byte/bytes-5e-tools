import Label from "../common/Label";

interface HeaderProps {
    onAddStatusEffect?: () => void;
}

export default function Header({ onAddStatusEffect }: HeaderProps) {
    return (
        <header>
            <h2>Status Effects</h2>
            <a className="status-effect-control" title="Create Status Effect" onClick={onAddStatusEffect}>
                <h2>
                    <Label icon="fa-plus">Add</Label>
                </h2>
            </a>
        </header>
    );
}
