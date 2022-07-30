import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { AnchoredPopupMixin } from '../../mixins/anchoredPopup.js';
import { Placement } from '../../utils/positionAnchoredElement.js';
import positionedStyles from '../../utils/directional-placement.css.js';

// Events to turn on/off the tooltip
const enterEvents = ['pointerenter', 'focus'];
const leaveEvents = ['pointerleave', 'blur', 'keydown', 'click'];

export class HoverO extends AnchoredPopupMixin(LitElement) {
  static styles = [
    positionedStyles,
    css`
      @supports not selector(:top-layer) {
        :host {
          z-index: var(--the-big-o-layer, 11501);
        }
      }
    `
  ];

  @property()
  placement: Placement = 'bottom';

  addEventListenersToAnchor() {
    enterEvents.forEach((event) => {
      this.anchorElement.addEventListener(event, this.handleShow);
    });
    leaveEvents.forEach((event) => {
      this.anchorElement.addEventListener(event, this.handleHide);
    });
  }

  removeEventListenersToAnchor() {
    enterEvents.forEach((event) => {
      this.anchorElement.removeEventListener(event, this.handleShow);
    });
    leaveEvents.forEach((event) => {
      this.anchorElement.removeEventListener(event, this.handleHide);
    });
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    this.setAttribute('popup', 'hint');
    this.resolveAnchor();
  }
}
