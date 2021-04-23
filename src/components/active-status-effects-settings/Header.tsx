import Label from "../common/Label";

export default function Header() {
    return (
        <header>
            <h2>Status Effects</h2>
            <a className="status-effect-control" title="Create Status Effect">
                <h2>
                    <Label icon="fa-plus">Add</Label>
                </h2>
            </a>
        </header>
    );
}
