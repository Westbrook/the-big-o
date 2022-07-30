import { TemplateResult, html } from "lit";

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
`;

export const transformedDecorator = (story: () => TemplateResult) => html`
    <style>
        .clipper {
            transform: rotateX(25deg) rotateY(10deg) translateZ(0px);
        }
    </style>
    <div class="clipper">
        ${story()}
    </div>
`;