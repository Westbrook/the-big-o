import { PropertyValues, ReactiveElement } from 'lit';
import { supportsAnchor } from '../utils/index.js';
import type { Constructor, Overlay } from './mixin-types.js';

export interface AnchoredInterface {
  anchorElement: HTMLElement;
}

export function AnchoredMixin<T extends Constructor<ReactiveElement & Overlay>>(
  constructor: T,
): T & Constructor<AnchoredInterface> {
    class AnchoredElement extends constructor {
      get anchorElement(): HTMLElement {
        return this._anchorElement;
      };

      set anchorElement(anchor: HTMLElement) {
        if (anchor === this.anchorElement) return;
        if (this.anchorElement) {
          this.removeEventListenersFromAnchor();
          if (supportsAnchor) {
            // @ts-ignore
            this.anchorElement.style.anchorName = '';
          }
        }
        this._anchorElement = anchor;
        if (supportsAnchor) {
          // @ts-ignore
          this.anchorElement.style.anchorName = '--anchor';
        }
        console.log('y')
        this.addEventListenersToAnchor();
      }

      private _anchorElement!: HTMLElement;

      resolveAnchor() {
        const id = this.getAttribute('anchor');
        if (!id) return;
        const parent = this.getRootNode() as HTMLElement;
        const target = parent.querySelector(`#${id}`) as HTMLElement;
        if (!target) return;
        this.anchorElement = target;
      }
  
      addEventListenersToAnchor() {}
  
      removeEventListenersFromAnchor() {}

      firstUpdated(changes: PropertyValues<this>) {
        super.firstUpdated(changes);
        this.resolveAnchor();
      }

      public connectedCallback() {
        super.connectedCallback();
        if (this.anchorElement) {
          this.addEventListenersToAnchor();
        }
      }
    
      public disconnectedCallback() {
        this.removeEventListenersFromAnchor();
        super.disconnectedCallback();
      }
    }
    return AnchoredElement;
  }