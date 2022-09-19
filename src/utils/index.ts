const div = document.createElement('div');
export const supportsTopLayer = 'popUp' in div;

export const supportsHas = CSS.supports('selector(:has())');

export const supportsAnchor = false; // CSS.supports('anchor-name: --test');

export const firstFocusableSelector =
    'button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([tabindex="-1"]), select:not([tabindex="-1"]), textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [focusable]:not([tabindex="-1"])';
