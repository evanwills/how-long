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
    // console.log('how-long-item render:', this.label, this.value);
    if (this.value <= 0) {
      return '';
    }

    const val = (typeof this.value === 'string')
      ? this.value
      : formatFloat(this.value);

    return html`<li>
      <span>${this.label}</span>
      <span>${val}</span>
    </li>`;
  }
  static styles = css`
  li {
    display: grid;
    grid-template-columns: 6.5rem auto;
    grid-gap: 1em 1.25em;
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
