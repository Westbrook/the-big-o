import { html, css, LitElement } from 'lit';
import { AnchoredDialogMixin } from '../../mixins/anchoredDialog.js';

export class ModalO extends AnchoredDialogMixin(LitElement) {
  static styles = css`
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
    .container {
      display: contents;
    }
  `;

  render() {
    return html`
      <dialog part="dialog" @click=${(e: Event) => console.log(e.composedPath())}>
        <div class="container" @click=${(e: Event) => console.log(e.composedPath())}>
          <slot></slot>
          <button @click=${this.handleHide}>X</button>
        </div>
      </dialog>
    `;
  }

  firstUpdated() {
    this.resolveAnchor();
  }
}
