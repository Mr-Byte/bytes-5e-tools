import { template } from "../../config";
import { render } from "react-dom";
import React from "react";

export abstract class ReactFormApplication<TProps extends object> extends FormApplication<FormApplication.Options, TProps> {
    public static get defaultOptions(): FormApplication.Options {
        return {
            ...super.defaultOptions,
            template: template("react-form.hbs")
        }
    }

    abstract get component(): React.JSXElementConstructor<TProps>;
    abstract getData(): TProps | Promise<TProps>;

    async _render(force?: boolean, options?: Application.RenderOptions) {
        await super._render(force, options);

        const container = document.getElementById("container");
        if (container) {
            render(<this.component {...await this.getData()} />, container)
        }
    }
}
