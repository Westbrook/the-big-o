import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { AnchoredPopupMixin } from '../../mixins/anchoredPopup.js';
import { Placement } from '../../utils/positionAnchoredElement.js';
import positionedStyles from '../../utils/directional-placement.css.js';
import { supportsTopLayer } from '../../utils/index.js';

export class ClickO extends AnchoredPopupMixin(LitElement) {
  static styles = [
    positionedStyles,
    css`
      @supports not selector(:top-layer) {
        :host {
          z-index: var(--the-big-o-layer, 10001);
        }
      }
    `
  ];

  @property()
  placement: Placement = 'bottom';

  addEventListenersToAnchor() {
    this.anchorElement.addEventListener('click', this.handleAnchorInteraction);
  }

  removeEventListenersToAnchor() {
    this.anchorElement.removeEventListener('click', this.handleAnchorInteraction);
  }

  async setupOverlay() {
    if (!supportsTopLayer) {
      document.documentElement.addEventListener('click', this.handleDocumentInteraction);
    }
    if (this.hasAttribute('focus')) {
      const focusTarget = (this.querySelector('[tabindex]:not([tabindex="-1"])') as HTMLElement);
      focusTarget.focus();
    }
  }

  async breakdownOverlay() {
    if (supportsTopLayer) return;
    document.documentElement.removeEventListener('click', this.handleDocumentInteraction);
  }

  handleAnchorInteraction = (event: Event) => {
    this.handleInteraction(event);
    event.preventDefault();
  }

  handleDocumentInteraction = (event: Event) => {
    this.handleInteraction(event);
  }

  handleInteraction = (event: Event) => {
    if (event.defaultPrevented) return;
    if (this.popupOpen) {
      this.handleHide(event);
      this.breakdownOverlay();
    } else {
      this.handleShow(event);
      this.setupOverlay();
    }
  }

  containClick(event: Event): void {
    event.stopPropagation();
  }

  render() {
    return html`
      <div class="container" @click=${this.containClick}>
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    this.setAttribute('popup', 'auto');
    this.resolveAnchor();
  }

  public disconnectedCallback() {
    this.breakdownOverlay();
    super.disconnectedCallback();
  }
}
