export default class XZangief extends HTMLElement {
  static get observedAttributes() {
    return ['type'];
  }

  static get types() {
    return [
      'combo',
      'fail',
      'rolling',
      'piledriver',
      'win'
    ];
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(value) {
    if (value) {
      if (XZangief.types.includes(value)) {
        this.setAttribute('type', value);
      }
    } else {
      this.removeAttribute('type');
    }
  }

  get imagePath() {
    const rootUrl = new URL(document.baseURI);
    const imageUrl = new URL(`webcomponents/img/${this.type}.gif`, rootUrl);

    return imageUrl.href;
  }

  constructor() {
    super();

    this.attachShadow({
      mode: 'open'
    }).appendChild(document.createElement('img'));
    this.img = this.shadowRoot.querySelector('img');
  }

  connectedCallback() {
    this.img.src = this.imagePath;
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'type') {
      this.img.src = this.imagePath;
    }
  }
}
