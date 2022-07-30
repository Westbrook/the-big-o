import { AnchoredMixin } from "./anchored.js";
import { PopupMixin } from "./popup.js";
import { positionAnchoredElement, Placement } from "../utils/positionAnchoredElement.js";

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function AnchoredPopupMixin<T extends Constructor<HTMLElement>>(constructor: T) {
    class AnchoredPopupElement extends AnchoredMixin(PopupMixin(constructor)) {  
        placement: Placement = 'bottom';

        cleanupFloatingUI?: () => void;
        positionPopUp() {
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

        handleHide = (event?: Event) => {
            this.hidePopUp();
            this.cleanupPopUp();
        }
    }
    return AnchoredPopupElement;
}