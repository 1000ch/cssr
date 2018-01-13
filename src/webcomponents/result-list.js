export default class ResultList extends HTMLElement {
  static get template() {
    return `
<div>
  <slot></slot>
</div>
    `;
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = ResultList.template;
  }
}
