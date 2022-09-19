import { html, css, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { AnchoredPopupMixin } from '../../mixins/anchoredPopup.js';
import { Placement } from '../../utils/positionAnchoredElement.js';
import positionedStyles from '../../utils/directional-placement.css.js';
import { supportsTopLayer } from '../../utils/index.js';
import { BigO } from '../overlay/BigO.js';

export class ClickO extends AnchoredPopupMixin(BigO) {
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

  removeEventListenersFromAnchor() {
    this.anchorElement.removeEventListener('click', this.handleAnchorInteraction);
  }

  async setupOverlay() {
    console.log('s');
    if (!supportsTopLayer) {
      document.documentElement.addEventListener('click', this.handleDocumentInteraction);
    }
    const focusTarget = (this.querySelector('[tabindex]:not([tabindex="-1"])') as HTMLElement);
    focusTarget?.focus();
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
    console.log('a', event.defaultPrevented);
    if (event.defaultPrevented) return;
    this.open = !this.open;
  }

  // eslint-disable-next-line class-methods-use-this
  containClick(event: Event): void {
    event.stopPropagation();
  }

  willUpdate(changes: PropertyValues<this>) {
    if (changes.has('open')) {
      if (this.open) {
        this.showOverlay();
        this.setupOverlay();
      } else if (typeof changes.get('open') !== 'undefined') {
        this.hideOverlay();
        this.breakdownOverlay();
      }
    }
  }

  render() {
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        class="container"
        @click=${this.containClick}
      >
        <slot></slot>
      </div>
    `;
    /* eslint-enable lit-a11y/click-events-have-key-events */
  }

  firstUpdated(changes: PropertyValues<this>) {
    super.firstUpdated(changes);
    this.setAttribute('popup', 'auto');
  }

  public disconnectedCallback() {
    this.breakdownOverlay();
    super.disconnectedCallback();
  }
}
