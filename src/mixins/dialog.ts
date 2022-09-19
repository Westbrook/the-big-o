import { ReactiveElement } from 'lit';
import type { Constructor, Overlay } from './mixin-types.js';

export function DialogMixin<T extends Constructor<ReactiveElement & Overlay>>(constructor: T): T {
    class DialogElement extends constructor {  
      get dialog() {
        return this.shadowRoot.querySelector('dialog') as HTMLDialogElement;
      }
  
      showOverlay = (_event?: Event) => {
        if (this.dialog.open) {
          return;
        }
        this.dialog.showModal();
      }

      hideOverlay = () => {
        const cleanUp = () => {
            this.handleClose();
            this.dialog.classList.remove('closing');
        }
        this.dialog.addEventListener('transitionend', cleanUp, { once: true });
        this.dialog.classList.add('closing');
      }
  
      handleClose = () => {
        if (!this.dialog.open) {
          return;
        }
        this.dialog.close();
      }
    }
    return DialogElement;
  }