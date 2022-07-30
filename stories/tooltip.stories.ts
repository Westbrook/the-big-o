import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../src/components/hover/hover-o.js';
import { centeredDecorator, clipPathedDecorator, clippedDecorator, layeredDecorator, relativeDecorator, transformedDecorator } from './index.js';

export default {
    title: 'External/Tooltip',
    component: 'hover-o',
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
}

const Template: Story<ArgTypes> = ({
    placement,
    mainAxis,
    crossAxis,
}: ArgTypes) => html`
    <button id="hover-o">This is a button</button>
    <hover-o
        anchor="hover-o"
        placement=${ifDefined(placement)}
        main-axis=${mainAxis}
        cross-axis=${crossAxis}
    >
        <sp-tooltip
            placement=${ifDefined(placement)}
            style="margin-${placement || 'top'}: var(--spectrum-overlay-animation-distance);"
        >Tooltip</sp-tooltip>
    </hover-o>
`;

export const Regular = (args: ArgTypes) => Template(args);