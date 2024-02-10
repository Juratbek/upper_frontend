/**
 * Build styles
 */
import { availableLevels } from './constants';
import classes from './Header.module.scss';

import { IconHeading, IconAlignCenter } from '@codexteam/icons';

export default class Header {
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: HeaderData, config: HeaderConfig, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   *   readOnly - read only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    /**
     * Styles
     *
     * @type {object}
     */
    this._CSS = {
      block: this.api.styles.block,
      wrapper: classes.header,
      placeholder: classes.placeholder,
    };

    /**
     * Tool's settings passed from Editor
     *
     * @type {HeaderConfig}
     * @private
     */
    this._settings = config;

    /**
     * Block's data
     *
     * @type {HeaderData}
     * @private
     */
    this._data = this.normalizeData(data);

    /**
     * Main Block wrapper
     *
     * @type {HTMLElement}
     * @private
     */
    this._element = this.getTag();
  }

  /**
   * Normalize input data
   *
   * @param {HeaderData} data - saved data to process
   *
   * @returns {HeaderData}
   * @private
   */
  normalizeData(data) {
    const newData = {};

    if (typeof data !== 'object') {
      data = {};
    }

    newData.text = data.text || '';
    newData.level = parseInt(data.level) || this.defaultLevel.number;
    newData.alignment = data.alignment;
    newData.placeholder = data.placeholder;

    return newData;
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLHeadingElement}
   * @public
   */
  render() {
    return this._element;
  }

  /**
   * Returns header block tunes config
   *
   * @returns {Array}
   */
  renderSettings() {
    const settings = this.levels.map((level) => ({
      icon: level.svg,
      label: this.api.i18n.t(`Heading ${level.number}`),
      onActivate: () => this.setLevel(level.number),
      closeOnActivate: true,
      isActive: this.currentLevel.number === level.number,
    }));

    settings.push({
      icon: IconAlignCenter,
      label: this.api.i18n.t(`Align center`),
      onActivate: () => this.toggleAlignment('center'),
      closeOnActivate: true,
      isActive: this._data.alignment === 'center',
    });

    return settings;
  }

  /**
   * Callback for Block's alignment settings buttons
   *
   * @param {number} alignment - text alignment to toggle
   */
  toggleAlignment(alignment) {
    if (alignment === this._data.alignment) {
      this.data = {
        ...this.data,
        alignment: undefined,
      };
    } else {
      this.data = {
        ...this.data,
        alignment,
      };
    }
  }

  /**
   * Callback for Block's level settings buttons
   *
   * @param {number} level - level to set
   */
  setLevel(level) {
    this.data = {
      ...this.data,
      level,
    };
  }

  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {HeaderData} data - saved data to merger with current block
   * @public
   */
  merge(data) {
    const newData = {
      text: this.data.text + data.text,
      level: this.data.level,
      alignment: this.data.alignment,
    };

    this.data = newData;
  }

  /**
   * Validate Text block data:
   * - check for emptiness
   *
   * @param {HeaderData} blockData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(blockData) {
    return blockData.text.trim() !== '';
  }

  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLHeadingElement} toolsContent - Text tools rendered view
   * @returns {HeaderData} - saved data
   * @public
   */
  save(toolsContent) {
    return {
      text: toolsContent.innerHTML,
      level: this.currentLevel.number,
      alignment: this.data.alignment,
    };
  }

  /**
   * Allow Header to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      export: 'text', // use 'text' property for other blocks
      import: 'text', // fill 'text' property from other block's export string
    };
  }

  /**
   * Sanitizer Rules
   */
  static get sanitize() {
    return {
      level: false,
      text: {},
    };
  }

  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Get current Tools`s data
   *
   * @returns {HeaderData} Current data
   * @private
   */
  get data() {
    this._data.text = this._element.innerHTML;
    this._data.level = this.currentLevel.number;

    return this._data;
  }

  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {HeaderData} data — data to set
   * @private
   */
  set data(data) {
    this._data = this.normalizeData(data);

    /**
     * If level is set and block in DOM
     * then replace it to a new block
     */
    if (data.level !== undefined && this._element.parentNode) {
      /**
       * Create a new tag
       *
       * @type {HTMLHeadingElement}
       */
      const newHeader = this.getTag();

      /**
       * Save Block's content
       */
      newHeader.innerHTML = this._element.innerHTML;

      /**
       * Replace blocks
       */
      this._element.parentNode.replaceChild(newHeader, this._element);

      /**
       * Save new block to private variable
       *
       * @type {HTMLHeadingElement}
       * @private
       */
      this._element = newHeader;
    }

    /**
     * If data.text was passed then update block's content
     */
    if (data.text !== undefined) {
      this._element.innerHTML = this._data.text || '';
    }
  }

  /**
   * Get tag for target level
   * By default returns second-leveled header
   *
   * @returns {HTMLElement}
   */
  getTag() {
    /**
     * Create element for current Block's level
     */
    const tag = document.createElement(this.currentLevel.tag);

    /**
     * Add text to block
     */
    tag.innerHTML = this._data.text || '';

    /**
     * Add styles class
     */
    tag.classList.add(this._CSS.wrapper);
    tag.classList.add(classes[`header_h${this.currentLevel.number}`]);
    if (this._data.placeholder) {
      tag.style.setProperty('--placeholder', `"${this._data.placeholder}"`);
    }

    /**
     * Add alignment class
     */
    const { alignment } = this._data;
    this._data.alignment && tag.classList.add(classes[`header_${alignment}`]);

    /**
     * Make tag editable
     */
    tag.contentEditable = this.readOnly ? 'false' : 'true';

    /**
     * Add Placeholder
     */
    tag.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || '');

    return tag;
  }

  /**
   * Get current level
   *
   * @returns {level}
   */
  get currentLevel() {
    let level = this.levels.find((levelItem) => levelItem.number === this._data.level);

    if (!level) {
      level = this.defaultLevel;
    }

    return level;
  }

  /**
   * Return default level
   *
   * @returns {level}
   */
  get defaultLevel() {
    /**
     * User can specify own default level value
     */
    if (this._settings.defaultLevel) {
      const userSpecified = this.levels.find((levelItem) => {
        return levelItem.number === this._settings.defaultLevel;
      });

      if (userSpecified) {
        return userSpecified;
      } else {
        console.warn(
          "(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels",
        );
      }
    }

    /**
     * With no additional options, there will be H2 by default
     *
     * @type {level}
     */
    return this.levels[1];
  }

  /**
   * @typedef {object} level
   * @property {number} number - level number
   * @property {string} tag - tag corresponds with level number
   * @property {string} svg - icon
   */

  /**
   * Available header levels
   *
   * @returns {level[]}
   */
  get levels() {
    return this._settings.levels
      ? availableLevels.filter((l) => this._settings.levels.includes(l.number))
      : availableLevels;
  }

  /**
   * Handle H1-H6 tags on paste to substitute it with header Tool
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event) {
    const content = event.detail.data;

    /**
     * Define default level value
     *
     * @type {number}
     */
    let level = this.defaultLevel.number;

    switch (content.tagName) {
      case 'H1':
        level = 1;
        break;
      case 'H2':
        level = 2;
        break;
      case 'H3':
        level = 3;
        break;
      case 'H4':
        level = 4;
        break;
      case 'H5':
        level = 5;
        break;
      case 'H6':
        level = 6;
        break;
    }

    if (this._settings.levels) {
      // Fallback to nearest level when specified not available
      level = this._settings.levels?.reduce((prevLevel, currLevel) => {
        return Math.abs(currLevel - level) < Math.abs(prevLevel - level) ? currLevel : prevLevel;
      });
    }

    this.data = {
      level,
      text: content.innerHTML,
    };
  }

  /**
   * Used by Editor.js paste handling API.
   * Provides configuration to handle H1-H6 tags.
   *
   * @returns {{handler: (function(HTMLElement): {text: string}), tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    };
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: IconHeading,
      title: 'Heading',
    };
  }
}
