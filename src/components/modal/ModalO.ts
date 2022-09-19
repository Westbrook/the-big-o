import { html, css, TemplateResult } from 'lit';
import { AnchoredDialogMixin } from '../../mixins/anchoredDialog.js';
import { BigO } from '../overlay/BigO.js';

export class ModalO extends AnchoredDialogMixin(BigO) {
  static styles = [
    css`
      @supports not selector(:top-layer) {
        :host {
          z-index: var(--the-big-o-layer, 10501);
        }
      }
      dialog {
        opacity: 0;
        transition: transform 0.5s, opacity 0.5s;
        pointer-events: none;
        display: block;
        position: fixed;
        top: 0px;
        bottom: 0px;
        padding: 0;
        border: none;
      }
      dialog::backdrop {
        opacity: 0;
      }
      dialog[open] {
        opacity: 1;
        pointer-events: auto;
      }
      dialog[open].closing {
        opacity: 0;
      }
      [part="container"] {
        padding: 1em;
        border: solid;
      }
    `
  ];

  // eslint-disable-next-line class-methods-use-this
  containClick(event: Event): void {
    event.stopPropagation();
  }

  // eslint-disable-next-line class-methods-use-this
  renderContainer(contents: TemplateResult) {
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <dialog
        part="dialog"
        @click=${this.hideOverlay}
      >
        <div
          part="container"
          @click=${this.containClick}
        >
          ${contents}
        </div>
      </dialog>
    `;
    /* eslint-enable lit-a11y/click-events-have-key-events */
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
}
