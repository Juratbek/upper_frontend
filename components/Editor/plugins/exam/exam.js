import { DeleteIcon } from './icons';
import classes from './Exam.module.scss';

export default class Exam {
  #variantIndex = 0;
  #selectedVariantIndex = null;
  #variants = {};

  constructor(args) {
    const { data, block, readOnly, config } = args;
    this.data = data;
    this.readOnly = readOnly;
    this.config = config;
    this.container = document.createElement('div');
    this.body = document.createElement('form');
    this.container.appendChild(this.body);
    this.block = block;
  }

  static get toolbox() {
    return {
      title: 'Exam',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  render() {
    this._renderBody();
    this._renderFooter();

    return this.container;
  }

  _addVariant(config) {
    const { autoFocus = false } = config || {};
    const item = createVariant(
      this.#variantIndex,
      this.block.id,
      (event) => (this.#selectedVariantIndex = event.target.value),
      (event, index) => (this.#variants[index] = event.target.textContent),
    );
    this.body.appendChild(item);
    this.#variantIndex++;
    if (autoFocus) {
      const paragraph = item.querySelector('p');
      paragraph.focus();
    }
  }

  _renderBody() {
    this._addVariant();
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
      const addVariantBtn = createButton();
      addVariantBtn.innerText = '+';
      addVariantBtn.onclick = () => this._addVariant({ autoFocus: true });
      buttons.appendChild(addVariantBtn);
    }

    footer.appendChild(buttons);

    this.container.appendChild(footer);
  }

  save(blockContent) {
    return {
      answerIndex: this.#selectedVariantIndex,
      variants: this.#variants,
    };
  }
}

function createButton() {
  const button = document.createElement('button');
  button.className = classes.button;
  button.type = 'button';
  return button;
}

function createIconButton() {
  const btn = document.createElement('button');
  btn.className = classes['icon-button'];
  btn.type = 'button';
  return btn;
}

function createVariant(index, name, onInputChange, onTextChange) {
  // creating an item
  const item = document.createElement('div');
  item.id = `${name}_${index}`;
  item.className = classes['quiz-item'];
  item.tabIndex = '0';

  // creating a radio
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = name;
  input.value = index;
  input.onchange = onInputChange;
  item.appendChild(input);

  // creating editable paragraph
  const paragraph = document.createElement('p');
  paragraph.contentEditable = true;
  paragraph.className = classes['quiz-item__text'];
  paragraph.onblur = (event) => onTextChange(event, index);
  item.appendChild(paragraph);

  // creating a delete icon
  const deleteBtn = createIconButton();
  const deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = '&#8722;';
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.onclick = () => (item.style.display = 'none');
  item.appendChild(deleteBtn);

  return item;
}
