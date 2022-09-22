import { html, TemplateResult } from 'lit';
import '../src/components/modal/modal-o.js';
import { centeredDecorator, clipPathedDecorator, clippedDecorator, complexLayeredDecorator, containedDecorator, layeredDecorator, relativeDecorator, transformedDecorator } from './index.js';

export default {
    title: 'Individual/Modal',
    component: 'modal-o',
    argTypes: {},
    args: {},
    decorators: [ centeredDecorator ]
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
}

const Template: Story<ArgTypes> = () => html`
    <button id="modal-o">This is a button</button>
    <modal-o anchor="modal-o">Modal</modal-o>
`;

export const Regular = (args: ArgTypes) => Template(args);

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