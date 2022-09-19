import { Placement } from '@floating-ui/dom';
import { html, render, TemplateResult } from 'lit';
import '../src/components/click/click-o.js';
import { ClickO } from '../src/components/click/ClickO.js';
import { centeredDecorator } from './index.js';

export default {
    title: 'Individual/Imperative',
    component: 'click-o',
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

const tagByType: Record<string, string> = {
    'click': 'click-o',
}
function openOverlay(
    trigger: HTMLElement,
    type: string,
    content: HTMLElement | (() => TemplateResult),
    config: {
        placement: Placement
    }
) {
    const tag = tagByType[type];
    let parentElement: HTMLElement | null;
    if (typeof content === 'function') {
        ({parentElement} = trigger); 
    } else {
        ({parentElement} = content); 
    }
    if (parentElement?.localName === tag) return;
    const overlay = document.createElement(tag) as ClickO;
    overlay.placement = config.placement;
    if (typeof content === 'function') {
        trigger.insertAdjacentElement('afterend', overlay);
        render(content(), overlay);
        console.log('registered to hide');
        overlay.addEventListener('hide', () => {
            console.log('hide');
            overlay.open = false;
            overlay.updateComplete.then(() => {
                overlay.remove();
            });
        }, { once: true });
    } else {
        content.insertAdjacentElement('beforebegin', overlay);
        overlay.append(content);
        overlay.addEventListener('hide', () => {
            console.log('hide');
            overlay.open = false;
            overlay.updateComplete.then(() => {
                overlay.insertAdjacentElement('beforebegin', content);
                overlay.remove();
            });
        }, { once: true });
    }
    if (overlay && 'updateComplete' in overlay) {
        overlay.anchorElement = trigger;
        overlay.updateComplete.then(() => {
            requestAnimationFrame(() => {
                overlay.open = true;
            });
        });
    }
}

const Template: Story<ArgTypes> = ({
    placement,
}: ArgTypes) => {
    let open = false;
    return html`
        <style>
            #content { opacity: 0; transition: opacity 0.4s; }
            #content[open] { opacity: 1; }
            button + #content {
                display: none;
            }
        </style>
        <button
            id="trigger"
            @click=${() => {
                open = !open;
                if (!open) return;
                const trigger = document.querySelector('#trigger') as HTMLButtonElement;
                const content = document.querySelector('#content') as HTMLDivElement;
                openOverlay(
                    trigger,
                    'click',
                    content,
                    {
                        placement,
                    }
                )
            }}
        >This is a button</button>
        <div id="content">This is an overlay with <input value="focusable" /> content.</div>
    `;
}

export const Regular = (args: ArgTypes) => Template(args);

export const onDemand = ({
    placement
}: ArgTypes) => {
    let open = false;
    return html`
        <style>
            #content { opacity: 0; transition: opacity 0.4s; }
            #content[open] { opacity: 1; }
            button + #content {
                display: none;
            }
        </style>
        <button
            id="trigger"
            @click=${() => {
                open = !open;
                console.log(open);
                if (!open) return;
                const trigger = document.querySelector('#trigger') as HTMLButtonElement;
                openOverlay(
                    trigger,
                    'click',
                    () => html`
                        <div id="content">This is an overlay with <input value="focusable" /> content.</div>
                    `,
                    {
                        placement,
                    }
                )
            }}
        >This is a button</button>
    `;
}