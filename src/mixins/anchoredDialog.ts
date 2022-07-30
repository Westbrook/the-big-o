import { AnchoredMixin } from "./anchored.js";
import { DialogMixin } from "./dialog.js";

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function AnchoredDialogMixin<T extends Constructor<HTMLElement>>(constructor: T) {
    class AnchoredDialogElement extends AnchoredMixin(DialogMixin(constructor)) {
        addEventListenersToAnchor() {
            this.anchorElement.addEventListener('click', this.handleShow);
        }
    
        removeEventListenersFromAnchor() {
            this.anchorElement.removeEventListener('click', this.handleShow);
        }
    }
    return AnchoredDialogElement;
}