import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatFloat } from './utils/general.utils';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('how-long-item')
export class HowLongItem extends LitElement {
  @property({type: Number})
  value: number = 0;

  @property({type: String})
  label: string = '';

  render() {
    console.log('how-long-item render:', this.label, this.value);
    if (this.value <= 0) {
      return '';
    }
    return html`<li>
      <span>${this.label}</span>
      <span>${formatFloat(this.value)}</span>
    </li>`;
  }
  static styles = css`
  li {
    display: grid;
    grid-template-columns: 5.5rem auto;
    grid-gap: 1em 2em;
    justify-content: start;
    text-align: left;
  }
  li span:first-child {
    font-weight: 600;
    text-align: right;
  }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'how-long-item': HowLongItem;
  }
}
