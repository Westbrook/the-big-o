import { PropertyValues, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';
import { firstFocusableSelector, supportsTopLayer } from '../utils/index.js';
import type { Constructor, Overlay } from './mixin-types.js';

export interface PopupInterface {
    hidePopUp(): void;
    showPopUp(): void;
    popupOpen: boolean;
    receivesFocus: 'auto' | undefined;
}
  
export function PopupMixin<T extends Constructor<ReactiveElement & Overlay>>(
    constructor: T
): T & Constructor<PopupInterface> {
    class PopupElement extends constructor {
        @property({ attribute: 'receives-focus' })
        receivesFocus: 'auto' | undefined;

        public get popupOpen(): boolean {
            return this._popupOpen;
        }

        public set popupOpen(open: boolean) {
            if (open === this.popupOpen) return;
            this._popupOpen = open;
            if (!supportsTopLayer) {
                this.toggleAttribute('popup-open', this.popupOpen);
            }
        }

        _popupOpen = false;

        hidePopUp() {
            if (!this.popupOpen) {
                return;
            }
            this.popupOpen = false;
            // @ts-ignore 
            if (super.hidePopUp && this.matches(':open')) {
                // @ts-ignore 
                super.hidePopUp();
                this.open = false;
            } else {
                console.log('will hide');
                this.dispatchEvent(new Event('hide', { bubbles: true, composed: true }));
            }
            let hasElementChildren = false;
            this.shadowRoot?.querySelector('slot')?.assignedElements()?.forEach(element => {
                hasElementChildren = true;
                element.toggleAttribute('open', false);
            });
            this.toggleAttribute('has-element-children', hasElementChildren);
        }

        positionPopUp() {}
        
        showPopUp() {
            if (this.popupOpen) {
                return;
            }
            this.popupOpen = true;
            // @ts-ignore 
            if (super.showPopUp && !this.matches(':open')) {
                // @ts-ignore 
                super.showPopUp();
                this.open = true;
                console.log('listener');
                this.addEventListener('hide', () => {
                    this.open = false;
                }, { once: true });
            } else {
                console.log('will show');
                this.dispatchEvent(new Event('show', { bubbles: true, composed: true }));
            }
            let hasElementChildren = false;
            this.shadowRoot?.querySelector('slot')?.assignedElements()?.forEach(element => {
                hasElementChildren = true;
                element.toggleAttribute('open', true);
            });
            this.toggleAttribute('has-element-children', hasElementChildren);
        }

        showOverlay = (_event?: Event) => {
            this.showPopUp();
            this.positionPopUp();
        }

        hideOverlay = (_event?: Event) => {
            console.log('ha', _event);
            this.hidePopUp();
        }

        updated(changes: PropertyValues<this>): void {
            super.updated(changes);
            if (changes.has('open') && this.open && this.receivesFocus === 'auto') {
                requestAnimationFrame(() => {
                    const firstFocusable = this.querySelector(firstFocusableSelector) as HTMLElement;
                    if (firstFocusable) {
                        console.log(firstFocusable)
                        firstFocusable.focus();
                    }
                });
            }
        }
    }
    return PopupElement;
}