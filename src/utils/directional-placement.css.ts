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
      overflow: hidden;
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
    @supports selector(:top-layer) {
      :host(:top-layer) {
        display: flex;
        /* opacity: 1; */
        pointer-events: auto;
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
    @supports not selector(:top-layer) {
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
`;