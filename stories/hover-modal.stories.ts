import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../src/components/modal/modal-o.js';
import '../src/components/hover/hover-o.js';
import { centeredDecorator } from './index.js';

export default {
    title: 'Combination/Hover, Modal',
    argTypes: {
        placementHover: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        }
    },
    args: {
        placementHover: 'top',
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
}

const Template: Story<ArgTypes> = ({
    placementHover,
}: ArgTypes) => html`
    <style>
        .overlay {
            background: white;
        }
    </style>
    <button id="click-o">This is a button</button>
    <hover-o class="overlay" anchor="click-o" placement=${ifDefined(placementHover)}>Hover</hover-o>
    <modal-o class="overlay" anchor="click-o">Modal</modal-o>
`;

export const Regular = (args: ArgTypes) => Template(args);

export const positioned = (args: ArgTypes) => html`
    <style>
        modal-o::part(dialog) {
            inset: 25% auto auto 25%;
        }
    </style>
    ${Template(args)}
`;