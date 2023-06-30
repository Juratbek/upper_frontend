import classes from './Test.module.scss';
import { settings, Toolbox, TYPES } from './constants';
import { createButton, createIconButton, renderSettings, renderVariants } from './utils';

export default class Test {
  #answers = new Set();
  #variants = [''];
  #type = 'singleSelect';

  constructor(args) {
    const { data, block, readOnly, config, api } = args;
    this.data = data;
    this.readOnly = readOnly;
    this.config = config;
    this.block = block;
    this.api = api;
    this.settings = settings;
    if (Array.isArray(data?.items)) this.#variants = Array.from(data.items);
    // creating container and body
    this.container = document.createElement('div');
    this.body = document.createElement('form');
    this.container.appendChild(this.body);
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return Toolbox;
  }

  render() {
    this._renderBody();
    this._renderFooter();

    return this.container;
  }

  renderSettings = () => {
    return renderSettings(this.settings, this._changeType, this);
  };

  _changeType = (setting) => {
    this.#type = setting.type;
    this._renderVariants();
    this.#answers = new Set();
  };

  _addVariant = (index) => {
    if (index) {
      this.#variants = this.#variants
        .slice(0, index)
        .concat([''])
        .concat(this.#variants.slice(index));
    } else {
      this.#variants.push('');
    }
    this._renderVariants({ autoFocus: true, focusIndex: index });
  };

  _deleteVariant = (index) => {
    this.#variants[index] = null;
    this.#variants = this.#variants.filter(Boolean);
    this._renderVariants();
  };

  _renderVariants(config) {
    const { autoFocus = false, focusIndex } = config || {};
    const variantsContainer = renderVariants(this.#variants, this.#type, this);
    this.body.innerHTML = '';
    this.body.appendChild(variantsContainer);

    if (autoFocus) {
      let focusingItem = null;
      if (focusIndex) {
        const variants = variantsContainer.children;
        focusingItem = variants[focusIndex];
      } else {
        focusingItem = variantsContainer.lastElementChild;
      }
      const focusingItemParagraph = focusingItem.querySelector('p');
      focusingItemParagraph.focus();
    }
  }

  _renderBody() {
    this._renderVariants();
  }

  _renderFooter() {
    // create footer
    const footer = document.createElement('div');
    footer.className = classes.footer;

    const buttons = document.createElement('div');
    if (this.readOnly) {
      const submitBtn = createButton();
      submitBtn.innerText = 'Submit';
      submitBtn.onclick = () => {
        this.config.onSubmit('this is for test');
      };
      buttons.appendChild(submitBtn);
    } else {
      const addVariantBtn = createIconButton({ size: 'medium' });
      addVariantBtn.innerText = '+';
      addVariantBtn.onclick = () => this._addVariant();
      buttons.appendChild(addVariantBtn);
    }

    footer.appendChild(buttons);
    this.container.appendChild(footer);
  }

  _variantInputChangeHandler = (event) => {
    const value = event.target.value;
    if (this.#type === TYPES.singleSelect) {
      this.#answers = [value];
    } else {
      this.#answers.add(value);
    }
  };

  _variantTextChangeHandler = (event, index) => {
    this.#variants[index] = event.target.innerHTML;
  };

  save() {
    return {
      items: this.#variants,
      answers: Array.from(this.#answers),
      type: this.#type,
    };
  }
}
