import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './how-long.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('how-long-app')
export class HowLongApp extends LitElement {
  @property({type: Boolean  })
  useGet: boolean = false;

  @property({type: Boolean  })
  noLocal: boolean = false;

  @property({type: Boolean  })
  notIdb: boolean = false;

  @state()
  private _when: string = '';

  connectedCallback(): void {
    console.group('<how-long-app> connectedCallback');
    console.log('when (before):', this._when);
    super.connectedCallback();

    if (this.useGet === true) {
      const urlParams = new URLSearchParams(window.location.search);
      console.log('URLSearchParams:', urlParams);
      const when = urlParams.get('when');
      if (typeof when === 'string' && when.trim() !== '') {
        this._when = when;
      }
    }

    console.log('when (after):', this._when);
    console.groupEnd();
  }

  render() {
    return html`<how-long .when=${this._when}></how-long>`;
  }

  static styles = css``
}

declare global {
  interface HTMLElementTagNameMap {
    'how-long-app': HowLongApp;
  }
}
