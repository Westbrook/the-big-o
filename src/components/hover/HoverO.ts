import { html, css, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { AnchoredPopupMixin } from '../../mixins/anchoredPopup.js';
import { Placement } from '../../utils/positionAnchoredElement.js';
import positionedStyles from '../../utils/directional-placement.css.js';
import { BigO } from '../overlay/BigO.js';

// Events to turn on/off the tooltip
const enterEvents = ['pointerenter', 'focus'];
const leaveEvents = ['pointerleave', 'blur', 'keydown', 'click'];

export class HoverO extends AnchoredPopupMixin(BigO) {
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
      this.anchorElement.addEventListener(event, this.showOverlay);
    });
    leaveEvents.forEach((event) => {
      this.anchorElement.addEventListener(event, this.hideOverlay);
    });
  }

  removeEventListenersToAnchor() {
    enterEvents.forEach((event) => {
      this.anchorElement.removeEventListener(event, this.showOverlay);
    });
    leaveEvents.forEach((event) => {
      this.anchorElement.removeEventListener(event, this.hideOverlay);
    });
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }

  firstUpdated(changes: PropertyValues<this>) {
    super.firstUpdated(changes);
    this.setAttribute('popup', 'hint');
  }
}
