import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../src/components/click/click-o.js';
import '../src/components/hover/hover-o.js';
import '../src/components/longpress/longpress-o.js';
import { centeredDecorator } from './index.js';

export default {
    title: 'Combination/Hover, Click, Longpress',
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
        },
        placementLongpress: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        }
    },
    args: {
        placementHover: 'top',
        placementClick: 'top',
        placementLongpress: 'top',
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
    placementLongpress: Placement;
}

const Template: Story<ArgTypes> = ({
    placementHover,
    placementClick,
    placementLongpress,
}: ArgTypes) => html`
    <style>
        .overlay {
            background: white;
        }
    </style>
    <button id="combo-o">This is a button</button>
    <hover-o class="overlay" anchor="combo-o" placement=${ifDefined(placementHover)}>Hover</hover-o>
    <click-o class="overlay" anchor="combo-o" placement=${ifDefined(placementClick)}>Click</click-o>
    <longpress-o class="overlay" anchor="combo-o" placement=${ifDefined(placementLongpress)}>Longpress</longpress-o>
`;

export const Regular = (args: ArgTypes) => Template(args);

export const offset = (args: ArgTypes) => Template(args);
offset.args = {
    placementHover: 'top',
    placementClick: 'bottom',
    placementLongpress: 'right',
}