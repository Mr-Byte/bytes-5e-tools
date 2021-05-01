import { render } from 'react-dom';
import { template } from '../../config';

export abstract class ReactFormApplication<TProps extends object>
    extends FormApplication<FormApplication.Options, TProps> {

    public static get defaultOptions(): FormApplication.Options {
        return {
            ...super.defaultOptions,
            template: template("react-form.hbs"),
        }
    }

    abstract get component(): React.JSXElementConstructor<TProps>;
    abstract getData(): TProps | Promise<TProps>;

    async _renderInner(data: TProps, options?: Application.RenderOptions) {
        const html = await super._renderInner(data, options);
        const container = html.find(".b5e\\:react-container").first()[0];

        if (container) {
            render(<this.component {...data} />, container)
        }

        return html;
    }
}
