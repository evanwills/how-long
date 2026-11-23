import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { forceNum, getDateStrFromTimestamp, getSecondsFromDuration } from './utils/general.utils';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('what-time')
export class WhatTime extends LitElement {
  @property({type: String})
  direction : 'future' | 'past' = 'future';
  @property({type: String})
  days: string = '';
  @property({type: String})
  hours: string = '';
  @property({type: String})
  minutes: string = '';
  @property({type: String})
  seconds: string = '';

  @property({type: Boolean})
  userRefresh: boolean = false;

  @property({type: Number})
  refreshInterval: number = 0;

  /**
   * number of milliseconds for duration
   */
  @state()
  future : boolean = true;

  /**
   * number of milliseconds for duration
   */
  @state()
  when : number = 0;

  @state()
  result : string = '';

  /**
   * number of seconds difference
   */
  @state()
  s : number = 0;
  /**
   * The number of minunutes difference.
   */
  @state()
  m : number = 0;
  /**
   * The number of hours difference.
   */
  @state()
  h : number = 0;
  /**
   * The number of days difference.
   */
  @state()
  d : number = 0;

  @state()
  _timeoutID : number | null = null;

  _timeoutMS : number = 0;

  private _setWhen() {
    this.when = getSecondsFromDuration(this.d, this.h, this.m, this.s, this.future);

    if (this.when !== 0) {
      this.result = getDateStrFromTimestamp(
        Date.now() + (this.when * 1000),
        Intl.DateTimeFormat().resolvedOptions().locale,
      );
    } else {
      this.result = '';
    }
  }

  private onDirChange(e : InputEvent) {
    if (e.target instanceof HTMLSelectElement) {
      const { id, value } = e.target;

      if (id === 'direction') {
        this.future = (value === 'future');
        this._setWhen();
      }
    }
  }

  private onChange(e: InputEvent) {
    if (e.target instanceof HTMLInputElement && e.target.checkValidity() === true) {
      const { id, valueAsNumber } = e.target;
      let ok = false;

      switch (id) {
        case 'days':
          this.d = valueAsNumber;
          ok = true;
          break;

        case 'hours':
          this.h = valueAsNumber;
          ok = true;
          break;

        case 'minutes':
          this.m = valueAsNumber;
          ok = true;
          break;

        case 'seconds':
          this.s = valueAsNumber;
          ok = true;
          break;
      }

      console.log('ok:', ok);
      if (ok === true) {
        this._setWhen();
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._timeoutMS = (this.refreshInterval > 0)
      ? this.refreshInterval * 1000
      : 0;

    this.d = forceNum(this.days);
    this.h = forceNum(this.hours);
    this.m = forceNum(this.minutes);
    this.s = forceNum(this.seconds);
    this.future = (this.direction === 'future')

    this._setWhen();
  }

  render() {
    return html`
      <div class="card">
        <ul>
          <li>
            <label for="direction">Direction</label>
            <select id="direction" @change=${this.onDirChange}>
              <option value="past">Past</option>
              <option value="future" selected="selected">Future</option>
            </select>
          </li>
          <li>
            <label for="days">Days</label>
            <input
              id="days"
              min="0"
              step="1"
              type="number"
              value=${this.days}
              @change=${this.onChange} />
          </li>
          <li>
            <label for="hours">Hours</label>
            <input
              id="hours"
              min="0"
              step="1"
              type="number"
              value=${this.hours}
              @change=${this.onChange} />
          </li>
          <li>
            <label for="minutes">Minutes</label>
            <input
              id="minutes"
              max="60"
              min="0"
              step="1"
              type="number"
              value=${this.minutes}
              @change=${this.onChange} />
          </li>
          <li>
            <label for="seconds">Seconds</label>
            <input
              id="seconds"
              max="60"
              min="0"
              step="1"
              type="number"
              value=${this.seconds}
              @change=${this.onChange} />
          </li>
        </ul>
        <p class="input">
          <span>A time duration</span>
        </p>
        ${(this.result !== '') ? html`<p><strong>When:</strong> ${this.result}</p>` : ''}

      </div>
    `
  }

  static styles = css`
    :host {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    input {
      width: 3rem;
    }

    .card {
      padding: 2em;
    }
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.35rem;
      list-style: none;
      margin: 0 auto;
      max-width: 20rem;
      padding: 0;
    }
    li.weekday:first-child {
      margin-bottom: 1rem;
    }
    li.weekday:first-child:has(+ li.epoc) {
      margin-bottom: 0;
    }
    li.weekday:first-child + li.epoc {
      margin-bottom: 1rem;
    }
    li.weekday:last-child {
      margin-top: 1rem;
    }
    li.epoc:has(+ li.weekday:last-child) {
      margin-top: 1rem;
    }
    li.epoc + li.weekday:last-child {
      margin-top: 0;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'what-time': WhatTime;
  }
}
