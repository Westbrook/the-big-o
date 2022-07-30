import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { HoverO } from '../src/components/hover/HoverO.js';
import '../src/components/hover/hover-o.js';

describe('HoverO', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<HoverO>(html`<hover-o></hover-o>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
