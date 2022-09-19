import { html, css, PropertyValues, TemplateResult } from 'lit';
import { PopupMixin } from '../../mixins/popup.js';
import positionedStyles from '../../utils/directional-placement.css.js';
import { BigO } from '../overlay/BigO.js';

export class ManualO extends PopupMixin(BigO) {
  static styles = [
    positionedStyles,
    css`
      :host {
        top: auto;
        bottom: 0;
        left: 0;
      }
      @supports not selector(:top-layer) {
        :host {
          z-index: var(--the-big-o-layer, 11001);
        }
      }
    `
  ];

  willUpdate(changes: PropertyValues<this>) {
    if (changes.has('open')) {
      if (this.open) {
        this.showOverlay();
      } else {
        this.hideOverlay();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderContainer(contents: TemplateResult) {
    return html`
      <div class="container">
        ${contents}
      </div>
    `;
  }

  renderContent() {
    return html`
      ${this.renderSlot()}
      <button @click=${this.hideOverlay}>X</button>
    `
  }

  render() {
    return html`
      ${this.renderContainer(this.renderContent())}
    `;
  }

  firstUpdated() {
    if (this.hasAttribute('defaultopen')) {
      this.showOverlay();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('popup', 'manual');
  }
}
