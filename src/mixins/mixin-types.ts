export type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export type Overlay = {
    hideOverlay: (_event?: Event) => void;
    open: boolean;
    shadowRoot: ShadowRoot;
    showOverlay: (_event?: Event) => void;
}