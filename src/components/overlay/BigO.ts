import { html, css, LitElement, TemplateResult, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

export class BigO extends LitElement {
    static styles = [
      css``
    ];

    shadowRoot!: ShadowRoot;

    @property({ type: Boolean })
    get open(): boolean {
      return this._open;
    }

    set open(open: boolean) {
      if (open === this.open) return;
      const previous = this.open;
      this._open = open;
      this.requestUpdate('open', previous);
    }
    
    _open = false;
  
    showOverlay(_event?: Event) {}
  
    hideOverlay(_event?: Event) {}

    willUpdate(changes: PropertyValues<this>): void {
      if (changes.has('open')) {
        if (this.open) {
          this.showOverlay();
        } else if (typeof changes.get('open') !== 'undefined') {
          this.hideOverlay();
        }
      }
    }
  
    // eslint-disable-next-line class-methods-use-this
    renderContainer(contents: TemplateResult) {
      return html`
        ${contents}
      `;
    }
  
    // eslint-disable-next-line class-methods-use-this
    public renderSlot() {
      return html`
        <slot></slot>
      `;
    }
  
    render() {
      return html`
        ${this.renderContainer(this.renderSlot())}
      `;
    }
}