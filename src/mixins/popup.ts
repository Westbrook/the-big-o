import { supportsTopLayer } from '../utils/index.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function PopupMixin<T extends Constructor<HTMLElement>>(constructor: T) {
    class PopupElement extends constructor {
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
            // @ts-ignore 
            if (super.hidePopUp && this.matches(':top-layer')) {
                // @ts-ignore 
                super.hidePopUp();
            }
            this.popupOpen = false;
            this.shadowRoot?.querySelector('slot')?.assignedElements()?.forEach(element => element.toggleAttribute('open', false));
        }

        positionPopUp() {}
        
        showPopUp() {
            if (this.popupOpen) {
                return;
            }
            // @ts-ignore 
            if (super.showPopUp && !this.matches(':top-layer')) {
                // @ts-ignore 
                super.showPopUp();
                this.addEventListener('hide', this.hidePopUp, { once: true });
            }
            this.popupOpen = true;
            this.shadowRoot?.querySelector('slot')?.assignedElements()?.forEach(element => element.toggleAttribute('open', true));
        }

        handleShow = (event?: Event) => {
            this.showPopUp();
            this.positionPopUp();
        }

        handleHide = (event?: Event) => {
            this.hidePopUp();
        }
    }
    return PopupElement;
}