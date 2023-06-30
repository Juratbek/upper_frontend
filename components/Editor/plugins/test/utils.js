import { TYPES } from './constants';
import classes from './Test.module.scss';

export function createButton() {
  const button = document.createElement('button');
  button.className = classes.button;
  button.type = 'button';
  return button;
}

export function createIconButton(config) {
  const { size = 'small' } = config || {};
  const btn = document.createElement('button');
  btn.className = classes['icon-button'];
  btn.classList.add(classes[`icon-button__${size}`]);
  btn.type = 'button';
  return btn;
}

export function createVariant({ text, index }, name, config) {
  const { onInputChange, onTextChange, inputType, onDelete } = config;
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
  paragraph.innerHTML = text;
  paragraph.contentEditable = true;
  paragraph.className = classes['quiz-item__text'];
  paragraph.setAttribute('data-index', index);
  paragraph.onblur = (event) => onTextChange(event, index);
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

export function renderSettings(settings, onClick, context) {
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

export function renderVariants(variants, type, context) {
  const variantsContainer = document.createElement('div');
  variants.forEach((variant, index) => {
    const item = createVariant({ text: variant, index }, context.block.id, {
      inputType: type === TYPES.multiSelect ? 'checkbox' : 'radio',
      onInputChange: context._variantInputChangeHandler,
      onTextChange: context._variantTextChangeHandler,
      onDelete: context._deleteVariant,
    });
    variantsContainer.appendChild(item);
  });

  variantsContainer.onkeydown = (event) => {
    const { target, metaKey, ctrlKey } = event;
    const isItemTextElement = target.classList.contains(classes['quiz-item__text']);

    // add a new variant if user hits the enter
    const isEnterClicked = event.key === 'Enter' && event.code === 'Enter';
    const isCommandAndEnter = (metaKey || ctrlKey) && isEnterClicked;
    if (isCommandAndEnter && isItemTextElement) {
      prevent(event);
      const index = event.target.dataset.index;
      context._variantTextChangeHandler(event, index);
      return context._addVariant(Number(index) + 1);
    }

    // remove the item if value is empty when user click backspace
    const isBackspaceClicked = event.key === 'Backspace' && event.code === 'Backspace';
    const isEmpty = target.innerText === '';
    if (isBackspaceClicked && isItemTextElement && isEmpty) {
      prevent(event);
    }
  };
  return variantsContainer;
}

export function prevent(event) {
  event.stopPropagation();
  event.preventDefault();
}
