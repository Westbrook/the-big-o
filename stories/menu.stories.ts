import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../src/components/click/click-o.js';
import { centeredDecorator, clipPathedDecorator, clippedDecorator, layeredDecorator, relativeDecorator, transformedDecorator } from './index.js';

export default {
    title: 'External/Menu',
    component: 'click-o',
    argTypes: {
        placement: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        },
        mainAxis: {
            control: {
                type: 'number'
            }
        },
        crossAxis: {
            control: {
                type: 'number'
            }
        },
        width: {
            control: {
                type: 'number'
            }
        }
    },
    args: {
        placement: 'top',
    },
    decorators: [ (story: () => TemplateResult) => html`<sp-theme scale="medium" color="light">${story()}</sp-theme>`, centeredDecorator ]
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    placement: Placement;
    mainAxis: number;
    crossAxis: number;
    width: number;
}

const Template: Story<ArgTypes> = ({
    placement,
    mainAxis,
    crossAxis,
    width,
}: ArgTypes) => html`
    <div style="--swc-menu-width: ${width}px;">
        <button id="hover-o">This is a button</button>
        <click-o
            anchor="hover-o"
            placement=${ifDefined(placement)}
            main-axis=${mainAxis}
            cross-axis=${crossAxis}
            focus
        >
            <sp-popover
                placement=${ifDefined(placement)}
                style="margin-${placement || 'top'}: var(--spectrum-overlay-animation-distance);"
            >
                <sp-menu>
                    <sp-menu-item>Option 1</sp-menu-item>
                    <sp-menu-item>Option 2</sp-menu-item>
                    <sp-menu-item>Option 3</sp-menu-item>
                    <sp-menu-item>Option 4</sp-menu-item>
                </sp-menu>
            </sp-popover>
        </click-o>
    </div>
`;

export const Regular = (args: ArgTypes) => Template(args);

export const layered = (args: ArgTypes) => Template(args);
layered.decorators = [layeredDecorator];

export const clipped = (args: ArgTypes) => Template(args);
clipped.decorators = [clippedDecorator];

export const positionRelative = (args: ArgTypes) => Template(args);
positionRelative.decorators = [relativeDecorator];

export const clipPathed = (args: ArgTypes) => Template(args);
clipPathed.decorators = [clipPathedDecorator];

export const transformed = (args: ArgTypes) => Template(args);
transformed.decorators = [transformedDecorator];