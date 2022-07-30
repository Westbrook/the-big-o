import { ClickO } from '../click/ClickO.js';

const LONGPRESS_DURATION = 300;
let LONGPRESS_TIMEOUT: ReturnType<typeof setTimeout>;

export type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

export const LONGPRESS_INSTRUCTIONS = {
    touch: 'Double tap and long press for additional options',
    keyboard: 'Press Space or Alt+Down Arrow for additional options',
    mouse: 'Click and hold for additional options',
};

export class LongpressO extends ClickO {
    addEventListenersToAnchor() {
      this.anchorElement.addEventListener('pointerdown', this.handlePointerdown);
      this.anchorElement.addEventListener('keydown', this.handleKeydown);
      this.anchorElement.addEventListener('keyup', this.handleKeyup);
      this.anchorElement.addEventListener('longpress', this.handleAnchorInteraction);
    }
  
    removeEventListenersToAnchor() {
      this.anchorElement.removeEventListener('longpress', this.handleAnchorInteraction);
    }

    private handleLongpressClick = (event: Event) => {
        event.preventDefault();
    }

    private handlePointerdown = (): void => {
        this.anchorElement.addEventListener('pointerup', this.handlePointerup);
        this.anchorElement.addEventListener('pointercancel', this.handlePointerup);
        LONGPRESS_TIMEOUT = setTimeout(() => {
            document.documentElement.addEventListener(
                'click',
                this.handleLongpressClick,
                { once: true, capture: true }
            );
            this.anchorElement.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'pointer',
                    },
                })
            );
        }, LONGPRESS_DURATION);
    }

    private handlePointerup = (): void => {
        clearTimeout(LONGPRESS_TIMEOUT);
        this.anchorElement.removeEventListener('pointerup', this.handlePointerup);
        this.anchorElement.removeEventListener('pointercancel', this.handlePointerup);
    }

    /**
     * @private
     */
    protected handleKeydown = (event: KeyboardEvent): void => {
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            if (code === 'ArrowDown') {
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        }
    }

    protected handleKeyup = (event: KeyboardEvent): void => {
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            event.stopPropagation();
            this.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'keyboard',
                    },
                })
            );
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        longpress: CustomEvent<LongpressEvent>;
    }
}