import classes from './Exam.module.scss';
import { settings, Toolbox, TYPES } from './constants';

export default class Exam {
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
    // creating container and body
    this.container = document.createElement('div');
    this.body = document.createElement('form');
    this.container.appendChild(this.body);
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
    console.log(setting);
    this.#type = setting.type;
    this._renderVariants();
    this.#answers = new Set();
  };

  _addVariant() {
    this.#variants.push('');
    this._renderVariants({ autoFocus: true });
  }

  _deleteVariant = (index) => {
    this.#variants[index] = null;
    this.#variants = this.#variants.filter(Boolean);
    this._renderVariants();
  };

  _renderVariants(config) {
    const { autoFocus = false } = config || {};
    const variantsContainer = renderVariants(this.#variants, this.#type, this);
    this.body.innerHTML = '';
    this.body.appendChild(variantsContainer);

    if (autoFocus) {
      const lastItem = variantsContainer.lastElementChild;
      const lastItemParagraph = lastItem.querySelector('p');
      lastItemParagraph.focus();
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
      addVariantBtn.onclick = () => this._addVariant({ autoFocus: true });
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
    this.#variants[index] = event.target.textContent;
  };

  save() {
    return {
      items: Array.from(this.#variants),
      answers: this.#answers,
      type: this.#type,
    };
  }
}

function createButton() {
  const button = document.createElement('button');
  button.className = classes.button;
  button.type = 'button';
  return button;
}

function createIconButton(config) {
  const { size = 'small' } = config || {};
  const btn = document.createElement('button');
  btn.className = classes['icon-button'];
  btn.classList.add(classes[`icon-button__${size}`]);
  btn.type = 'button';
  return btn;
}

function createVariant({ text, index }, name, config) {
  const { onInputChange, onTextChange, onEnter, inputType, onDelete } = config;
  // creating an item
  const item = document.createElement('div');
  item.className = classes['quiz-item'];
  item.tabIndex = '0';

  // creating a radio/checkbox
  const input = document.createElement('input');
  input.type = inputType;
  input.name = name;
  input.value = index;
  input.onchange = onInputChange;
  item.appendChild(input);

  // creating editable paragraph
  const paragraph = document.createElement('p');
  paragraph.innerText = text;
  paragraph.contentEditable = true;
  paragraph.className = classes['quiz-item__text'];
  paragraph.onblur = (event) => onTextChange(event, index);
  paragraph.onkeydown = (event) => {
    if (event.key === 'Enter' && event.code === 'Enter') onEnter(event);
  };
  item.appendChild(paragraph);

  // creating a delete icon
  const deleteBtn = createIconButton();
  const deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = '&#8722;';
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.onclick = () => onDelete(index);
  item.appendChild(deleteBtn);

  return item;
}

function renderSettings(settings, onClick, context) {
  const wrapper = document.createElement('div');

  settings.forEach((tune) => {
    const button = document.createElement('div');

    button.classList.add(context.api.styles.settingsButton);
    button.onclick = () => {
      onClick(tune);
      button.classList.add(context.api.styles.settingsButtonActive);
    };
    button.innerHTML = tune.icon;
    wrapper.appendChild(button);
  });

  return wrapper;
}

function renderVariants(variants, type, context) {
  const variantsContainer = document.createElement('div');
  variants.forEach((variant, index) => {
    const item = createVariant({ text: variant, index }, context.block.id, {
      inputType: type === TYPES.multiSelect ? 'checkbox' : 'radio',
      onInputChange: context._variantInputChangeHandler,
      onTextChange: context._variantTextChangeHandler,
      onDelete: context._deleteVariant,
      onEnter: console.log,
    });
    variantsContainer.appendChild(item);
  });
  return variantsContainer;
}
