import { html, css, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { PopupMixin } from '../../mixins/popup.js';
import positionedStyles from '../../utils/directional-placement.css.js';

export class ManualO extends PopupMixin(LitElement) {
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

  @property({ type: Boolean })
  open = false;

  handleClick(event?: Event): void {
    event?.stopPropagation();
    this.open = false;
  }

  willUpdate(changes: PropertyValues<this>) {
    if (changes.has('open')) {
      if (this.open) {
        this.handleShow();
      } else {
        this.handleHide();
      }
    }
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
        <button @click=${this.handleClick}>X</button>
      </div>
    `;
  }

  firstUpdated() {
    if (this.hasAttribute('defaultopen')) {
      this.handleShow();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('popup', 'manual');
  }
}
