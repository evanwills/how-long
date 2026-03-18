import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './how-long-item.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('how-long')
export class HowLong extends LitElement {
  @property({type: String})
  when: string = '';

  @property({type: Boolean})
  userRefresh: boolean = false;

  @property({type: Number})
  refreshInterval: number = 60000;

  /**
   * number of milliseconds difference
   */
  @state()
  ms : number = 0
  /**
   * number of seconds difference
   */
  @state()
  s : number = 0
  /**
   * The number of minurwa difference.
   */
  @state()
  min : number = 0;
  /**
   * The number of hours difference.
   */
  @state()
  h : number = 0
  /**
   * The number of days difference.
   */
  @state()
  d : number = 0
  /**
   * The number of weeks difference.
   */
  @state()
  w : number = 0
  /**
   * The number of months difference.
   */
  @state()
  mon : number = 0;
  /**
   * The number of years difference.
   */
  @state()
  y : number = 0;

  _lastChange : number = 0;

  _setMS(input: string) {
    console.group('<how-long> _setMS()');
    console.log('input:', input);
    const when = new Date(input);
    console.log('when:', when);

    if (when.toString() === 'Invalid Date') {
      this.ms = 0;
      this.s = 0;
      this.min = 0;
      this.h = 0;
      this.d = 0;
      this.w = 0;
      this.mon = 0;
      this.y = 0;

      return null;
    }

    const now = new Date();
    const tmp = when.getTime() - now.getTime();
    this.ms = (tmp >= 0) ? tmp : -tmp;
    this.s = (this.ms / 1000);
    this.min = (this.ms / (1000 * 60));
    this.h = (this.ms / (1000 * 60 * 60));
    this.d = (this.ms / (1000 * 60 * 60 * 24));
    this.w = (this.ms / (1000 * 60 * 60 * 24 * 7));
    this.mon = (this.ms / (1000 * 60 * 60 * 24 * 30.44));
    this.y = (this.ms / (1000 * 60 * 60 * 24 * 365.25));

    return when;
  }

  private onChange(e: Event) {
    const input = e.target as HTMLInputElement
    const when = this._setMS(input.value)

    if (when !== null && Date.now() - this._lastChange > 60000) {
      this._lastChange = Date.now();

      this.dispatchEvent(
        new CustomEvent('how-long-change', { detail: when })
      );
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.group('how-long connectedCallback');
    console.log('when:', this.when);

    if (this.when.trim() !== '') {
      this._setMS(this.when);
      console.log('Calculated ms from when attribute:', this.ms);
      console.log('s:', this.s);
      console.log('min:', this.min);
      console.log('h:', this.h);
      console.log('d:', this.d);
      console.log('w:', this.w);
      console.log('mon:', this.mon);
    }
    console.groupEnd();
  }

  render() {
    return html`
      <div class="card">
        <p class="input">
          <label for="when">When:</label>
          <input
            id="when"
            type="datetime-local"
            value="${this.when}"
            @change=${this.onChange} />
          <span>Enter the date you want to see how long ago (or how far in the future) it is from now.</span>
        </p>
        ${(this.ms === 0)
          ? html`<p>Please enter a date and time in the field above.</p>`
          : html`
          <ul>
            <how-long-item label="Milliseconds:" .value=${this.ms}></how-long-item>
            <how-long-item label="Seconds:" .value=${this.s}></how-long-item>
            <how-long-item label="Minutes:" .value=${this.min}></how-long-item>
            <how-long-item label="Hours:" .value=${this.h}></how-long-item>
            <how-long-item label="Days:" .value=${this.d}></how-long-item>
            <how-long-item label="Weeks:" .value=${this.w}></how-long-item>
            <how-long-item label="Months:" .value=${this.mon}></how-long-item>
            <how-long-item label="Years:" .value=${this.y}></how-long-item>
          </ul>
        `}
      </div>
    `
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .input {
      margin-bottom: 2em;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      grid-gap: 0.5em;
      align-items: start;
    }

    .input span {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
      font-size: 0.9em;
      color: #666;
    }

    .card {
      padding: 2em;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'how-long': HowLong;
  }
}
