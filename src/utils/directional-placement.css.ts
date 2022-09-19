import { css } from 'lit';

export default css`
    :host {
      margin: 0;
      border: 0;
      background: none;
      padding: 0;
      pointer-events: none;
      display: flex;
      /* opacity: 0; */
      /* transition: opacity 0.5s 0s, pointer-events 0s 0.5s; */
      top: 0;
      left: 0;
      position: fixed;
      overflow: visible;
    }
    :host(:not([has-element-children])) {
      opacity: 0;
      transition: opacity 0.5s 0s;
    }
    :host([popup-open]:not([has-element-children])) {
      opacity: 1;
    }
    /* .container {
      transform: translateY(0);
      transition: transform 0.5s, padding 0.5s;
    } */
    /* :host([actual-placement="top"]) .container {
      padding-top: 1em;
    }
    :host([actual-placement="bottom"]) .container {
      padding-bottom: 1em;
    }
    :host([actual-placement="left"]) {
      justify-content: flex-end;
    }
    :host([actual-placement="left"]) .container {
      padding-left: 1em;
    }
    :host([actual-placement="right"]) .container {
      padding-right: 1em;
    } */
    @supports selector(:open) {
      :host(:open) {
        display: flex;
        /* opacity: 1; */
        pointer-events: auto;
      }
      :host(:open:not([has-element-children])) {
        opacity: 1;
      }
      /* :host([actual-placement="top"]:top-layer) .container {
        transform: translateY(-1em);
      }
      :host([actual-placement="bottom"]:top-layer) .container {
        transform: translateY(1em);
      }
      :host([actual-placement="left"]:top-layer) .container {
        transform: translateX(-1em);
      }
      :host([actual-placement="right"]:top-layer) .container {
        transform: translateX(1em);
      } */
    }
    @supports not selector(:open) {
      :host([popup-open]) {
        display: flex;
        opacity: 1;
        pointer-events: auto;
      }
      /* :host([actual-placement="top"][popup-open]) .container {
        transform: translateY(-1em);
      }
      :host([actual-placement="bottom"][popup-open]) .container {
        transform: translateY(1em);
      }
      :host([actual-placement="left"][popup-open]) .container {
        transform: translateX(-1em);
      }
      :host([actual-placement="right"][popup-open]) .container {
        transform: translateX(1em);
      } */
    }
    ::slotted(*) {
      position: relative;
    }

    @supports (anchor-name: --test) {
        :host {
            position: absolute;
            position-fallback: --top-to-bottom;
        }
    }

    @position-fallback --top-to-bottom {
        @try {
            bottom: anchor(--anchor top);
            left: anchor(--anchor right);
        }
        @try {
            top: anchor(--anchor bottom);
            left: anchor(--anchor right);
        }
    }
`;