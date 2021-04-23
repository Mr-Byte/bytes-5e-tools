import Button, { ButtonType } from "../common/Button";

export default function Footer() {
    return (
        <footer>
            <Button type={ButtonType.Submit} icon="fa-save">
                Save Changes
            </Button>

            <Button type={ButtonType.Button} icon="fa-save">
                Reset Defaults
            </Button>
        </footer>
    );
}
