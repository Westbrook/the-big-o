type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function AnchoredMixin<T extends Constructor<HTMLElement>>(constructor: T) {
    class AnchoredElement extends constructor {
      anchorElement!: HTMLElement;
  
      resolveAnchor() {
        const id = this.getAttribute('anchor');
        if (!id) return;
        const parent = this.getRootNode() as HTMLElement;
        const target = parent.querySelector(`#${id}`) as HTMLElement;
        if (!target) return;
        if (this.anchorElement) {
          this.removeEventListenersFromAnchor();
        }
        this.anchorElement = target;
        this.addEventListenersToAnchor();
      }
  
      addEventListenersToAnchor() {}
  
      removeEventListenersFromAnchor() {}
    }
    return AnchoredElement;
  }