type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function DialogMixin<T extends Constructor<HTMLElement>>(constructor: T) {
    class DialogElement extends constructor {
      get isOpen() {
        return this.dialog.open;
      }
  
      get dialog() {
        return this.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
      }
  
      handleShow = (event?: Event) => {
        if (this.isOpen) {
          return;
        }
        this.dialog.showModal();
      }

      handleHide = () => {
        const cleanUp = () => {
            this.handleClose();
            this.dialog.classList.remove('closing');
        }
        this.dialog.addEventListener('transitionend', cleanUp, { once: true });
        this.dialog.classList.add('closing');
      }
  
      handleClose = () => {
        if (!this.isOpen) {
          return;
        }
        this.dialog.close();
      }
    }
    return DialogElement;
  }