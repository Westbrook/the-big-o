import { TemplateResult, html } from "lit";
import { supportsTopLayer } from "../src/utils/index.js";

const support = () => html`
    <style>
        .support {
            background: white;
            padding: 10px;
            position: absolute;
            z-index: 100;
        }
    </style>
    ${supportsTopLayer
        ? html``
        : html`<div class="support">This requires :top-layer support</div>`
    }
`;

export const centeredDecorator = (story: () => TemplateResult) => html `
    <style>
        body {
            display: grid;
            place-content: center;
            width: 100%;
            min-height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        #root, #root-inner {
            display: contents;
        }
    </style>
    ${story()}
`;

export const layeredDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            position: relative;
        }
        .clipper > section {
            position: absolute;
            z-index: 10;
            background: red;
        }
        .top {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 50vh;
        }
        .bottom {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 50vh;
        }
        .left {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            height: 100vh;
            width: 50vw;
        }
        .right {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            height: 100vh;
            width: 50vw;
        }
    </style>
    <div class="clipper">
        ${story()}
        <section class="top"></section>
        <section class="right"></section>
        <section class="bottom"></section>
        <section class="left"></section>
    </div>
`;


export const complexLayeredDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            position: relative;
        }
        .clipper > div {
            z-index: 1;
            position: relative;
        }
        .clipper > section {
            position: absolute;
            z-index: 10;
            background: red;
        }
        .top {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 50vh;
        }
        .bottom {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 50vh;
        }
        .left {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            height: 100vh;
            width: 50vw;
        }
        .right {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            height: 100vh;
            width: 50vw;
        }
    </style>
    <div class="clipper">
        <div>
            ${story()}
        </div>
        <section class="top"></section>
        <section class="right"></section>
        <section class="bottom"></section>
        <section class="left"></section>
    </div>
    ${support()}
`;

export const clippedDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            overflow: hidden;
        }
    </style>
    <div class="clipper">
        ${story()}
    </div>
`;

export const containedDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            contain: content;
        }
    </style>
    <div class="clipper">
        ${story()}
    </div>
    ${support()}
`;

export const relativeDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            position: relative;
        }
    </style>
    <div class="clipper">
        ${story()}
    </div>
`;

export const clipPathedDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            clip-path: inset(0 0);
        }
    </style>
    <div class="clipper">
        ${story()}
    </div>
    ${support()}
`;

export const transformedDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            transform: rotateX(25deg) rotateY(10deg) translateZ(0px);
        }
        .support {
            background: white;
            padding: 10px;
            position: absolute;
            z-index: 100;
        }
    </style>
    <div class="clipper">
        ${story()}
    </div>
    ${supportsTopLayer
        ? html`<div class="support">This requires updates to Floating-UI when used with :top-layer: <a href="https://github.com/floating-ui/floating-ui/issues/1842" target="_blank">tracking issue</a>.</div>`
        : html`<div class="support">This "work" in an unexpected way.</div>`
    }
`;