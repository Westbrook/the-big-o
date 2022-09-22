import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../src/components/longpress/longpress-o.js';
import { centeredDecorator, clipPathedDecorator, clippedDecorator, complexLayeredDecorator, containedDecorator, layeredDecorator, relativeDecorator, transformedDecorator } from './index.js';

export default {
    title: 'Individual/Longpress',
    component: 'longpress-o',
    argTypes: {
        placement: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        }
    },
    args: {
        placement: 'top',
    },
    decorators: [ centeredDecorator ]
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    placement: Placement;
}

const Template: Story<ArgTypes> = ({
    placement,
}: ArgTypes) => html`
    <button id="longpress-o">This is a button</button>
    <longpress-o anchor="longpress-o" placement=${ifDefined(placement)}>Overlay</longpress-o>
`;

export const Regular = (args: ArgTypes) => Template(args);

export const top = (args: ArgTypes) => Template(args);
top.args = {
    placement: 'top',
}
;
export const right = (args: ArgTypes) => Template(args);
right.args = {
    placement: 'right',
};

export const bottom = (args: ArgTypes) => Template(args);
bottom.args = {
    placement: 'bottom',
};

export const left = (args: ArgTypes) => Template(args);
left.args = {
    placement: 'left',
};

export const layered = (args: ArgTypes) => Template(args);
layered.decorators = [layeredDecorator];

;export const complexLayered = (args: ArgTypes) => Template(args);
complexLayered.decorators = [complexLayeredDecorator];

export const clipped = (args: ArgTypes) => Template(args);
clipped.decorators = [clippedDecorator];

export const contained = (args: ArgTypes) => Template(args);
contained.decorators = [containedDecorator];

export const positionRelative = (args: ArgTypes) => Template(args);
positionRelative.decorators = [relativeDecorator];

export const clipPathed = (args: ArgTypes) => Template(args);
clipPathed.decorators = [clipPathedDecorator];

export const transformed = (args: ArgTypes) => Template(args);
transformed.decorators = [transformedDecorator];