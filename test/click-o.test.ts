import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { ClickO } from '../src/components/click/ClickO.js';
import '../src/components/click/click-o.js';

describe('Click Overlay', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<ClickO>(html`<click-o></click-o>`);

    await expect(el).shadowDom.to.be.accessible();
  });
  it('opens on click');
  it('opens declaratively');
  it('closes on click');
  it('closes declaratively');
  it('closes on click await');
  it('closes on `Escape`');
});
