import { ReactiveElement } from "lit";
import { AnchoredMixin } from "./anchored.js";
import { DialogMixin } from "./dialog.js";
import type { Constructor, Overlay } from './mixin-types.js';

export function AnchoredDialogMixin<T extends Constructor<ReactiveElement & Overlay>>(constructor: T): T {
    class AnchoredDialogElement extends AnchoredMixin(DialogMixin(constructor)) {
        addEventListenersToAnchor() {
            this.anchorElement.addEventListener('click', this.showOverlay);
        }
    
        removeEventListenersFromAnchor() {
            this.anchorElement.removeEventListener('click', this.showOverlay);
        }
    }
    return AnchoredDialogElement;
}