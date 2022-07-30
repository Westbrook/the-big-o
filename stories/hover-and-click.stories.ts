import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../src/components/click/click-o.js';
import '../src/components/hover/hover-o.js';
import { centeredDecorator } from './index.js';

export default {
    title: 'Combination/Hover, Click',
    argTypes: {
        placementHover: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        },
        placementClick: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        }
    },
    args: {
        placementHover: 'top',
        placementClick: 'top',
    },
    decorators: [ centeredDecorator ]
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    placementHover: Placement;
    placementClick: Placement;
}

const Template: Story<ArgTypes> = ({
    placementHover,
    placementClick,
}: ArgTypes) => html`
    <style>
        .overlay {
            background: white;
        }
    </style>
    <button id="click-o">This is a button</button>
    <hover-o class="overlay" anchor="click-o" placement=${ifDefined(placementHover)}>Hover</hover-o>
    <click-o class="overlay" anchor="click-o" placement=${ifDefined(placementClick)}>Click</click-o>
`;

export const Regular = (args: ArgTypes) => Template(args);

export const opposite = (args: ArgTypes) => Template(args);
opposite.args = {
    placementHover: 'top',
    placementClick: 'bottom',
}