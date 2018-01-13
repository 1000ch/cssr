export default class ResultItem extends HTMLElement {
  static get template() {
    return `
<style>
  div {
    overflow: hidden;
  }
  :host {
    width: 100%;
    height: 100%;
  }
  :host([unused]) {
    color: indianred;
  }
  :host([duplicate]) {
    color: goldenrod;
  }
  :host([unused][duplicate]) {
    color: indianred ;
  }
  code {
    position: relative;
  }
  code:hover::before {
    position: absolute;
    display: inline-block;
    content: '';
    left: 100%;
    top: 0;
    border: 12px solid transparent;
    border-right-color: #666;
  }
  code:hover::after {
    position: absolute;
    display: inline-block;
    content: attr(count) 'times';
    left: 100%;
    top: 0;
    margin-left: 24px;
    padding-left: 0.6em;
    padding-right: 0.6em;
    line-height: 24px;
    color: #ccc;
    background: #666;
    text-align: center;
    font-size: 13px;
  }
</style>
<div>
  <code>
    <slot></slot>
  </code>
</div>
    `;
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = ResultItem.template;
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'count') {
      this.shadowRoot.querySelector('code').setAttribute('count', newValue);
    }
  }
}
