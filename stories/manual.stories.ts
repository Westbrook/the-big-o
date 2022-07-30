import { Placement } from '@floating-ui/dom';
import { html, TemplateResult } from 'lit';
import '../src/components/manual/manual-o.js';
import { centeredDecorator, clipPathedDecorator, clippedDecorator, layeredDecorator, relativeDecorator, transformedDecorator } from './index.js';

export default {
    title: 'Individual/Manual',
    component: 'manual-o',
    argTypes: {
        placement: {
            control: {
                type: 'inline-radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
        },
        open: {
            control: 'boolean',
        },
    },
    args: {
        placement: 'top',
        open: true,
    },
    decorators: [ centeredDecorator ]
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    open?: boolean;
    placement: Placement;
}

const Template: Story<ArgTypes> = ({
    open,
    placement
}: ArgTypes) => html`
    <manual-o
        anchor="manual-o"
        actual-placement=${placement}
        ?open=${open}
    >Manual</manual-o>
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