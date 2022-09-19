import { ReactiveElement } from "lit";
import { AnchoredInterface, AnchoredMixin } from "./anchored.js";
import { PopupInterface, PopupMixin } from "./popup.js";
import { positionAnchoredElement, Placement } from "../utils/positionAnchoredElement.js";
import type { Constructor, Overlay } from './mixin-types.js';
import { supportsAnchor } from "../utils/index.js";

export function AnchoredPopupMixin<T extends Constructor<ReactiveElement & Overlay>>(
    constructor: T
): T & Constructor<AnchoredInterface & PopupInterface> {
    class AnchoredPopupElement extends AnchoredMixin(PopupMixin(constructor)) {  
        placement: Placement = 'bottom';

        cleanupFloatingUI?: () => void;

        positionPopUp() {
            if (supportsAnchor) {
                return;
            }
            const offsetOptions = {
                mainAxis: parseFloat(this.getAttribute('main-axis') || '6'),
                crossAxis: parseFloat(this.getAttribute('cross-axis') || '0'),
            }
            this.cleanupFloatingUI = positionAnchoredElement(this, this.anchorElement, this.placement, offsetOptions);
        }

        cleanupPopUp() {
            if (this.cleanupFloatingUI) {
                this.cleanupFloatingUI();
                delete this.cleanupFloatingUI;
            }
        }

        handleHide = (_event?: Event) => {
            this.hidePopUp();
            this.cleanupPopUp();
        }
    }
    return AnchoredPopupElement;
}