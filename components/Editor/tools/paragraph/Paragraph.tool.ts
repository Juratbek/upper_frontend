/**
 * Import styles library
 */
/**
 * Import icons
 */
import { IconText } from '@codexteam/icons';
import { API, BlockAPI, BlockTool } from '@editorjs/editorjs';

import styles from './Paragraph.module.scss';
/**
 * Import types
 */
import { IParagraphConfig, IParagraphData } from './Paragraph.types';

/**
 * Paragraph Tool for Editor.js
 */
export default class Paragraph implements BlockTool {
  /**
   * Code API — public methods to work with Editor
   *
   * @link https://editorjs.io/api
   */
  // private readonly api: API;

  /**
   * Block API — methods and properties to work with Block instance
   *
   * @link https://editorjs.io/blockapi
   */
  // private readonly block: BlockAPI;

  /**
   * Read-only mode flag
   */
  private readonly readOnly: boolean;

  /**
   * Tool data for input and output
   */
  private data: IParagraphData;

  /**
   * Configuration object that passed through the initial Editor configuration.
   */
  private config: IParagraphConfig;

  /**
   * Tool's HTML nodes
   */
  private nodes: { [key: string]: HTMLElement | null };

  /**
   * Class constructor
   *
   * @link https://editorjs.io/tools-api#class-constructor
   */
  constructor({
    data,
    config,
    readOnly,
  }: Partial<{
    data: IParagraphData;
    config?: IParagraphConfig;
    api: API;
    block: BlockAPI;
    readOnly: boolean;
  }>) {
    this.data = data ?? { text: '' };
    this.config = config ?? {};
    this.readOnly = readOnly ?? false;

    /**
     * Declare Tool's nodes
     */
    this.nodes = {
      wrapper: null,
    };
  }

  /**
   * PUBLIC METHODS
   *
   * @link https://editorjs.io/tools-api#public-methods
   */

  /**
   * Creates UI of a Block
   * Required
   * @link https://editorjs.io/tools-api#render
   *
   * @returns {HTMLElement}
   */
  render(): HTMLElement {
    const p = document.createElement('p');
    p.classList.add(styles['Paragraph-tool']);
    p.contentEditable = (!this.readOnly).toString();
    p.innerHTML = this.data.text ?? '';

    this.nodes.wrapper = p;
    return this.nodes.wrapper;
  }

  /**
   * Extracts Block data from the UI
   * Required
   * @link https://editorjs.io/tools-api#save
   *
   * @returns {IParagraphData} saved data
   */
  save(): IParagraphData {
    return {
      text: this.nodes.wrapper?.innerHTML ?? '',
    };
  }

  /**
   * Validates Block data after saving
   * @link https://editorjs.io/tools-api#validate
   *
   * @param {IParagraphData} savedData
   * @returns {boolean} true if data is valid, otherwise false
   */
  // validate() {}

  /**
   *
   * Returns HTML that will be appended at the top of Block-settings
   * @link https://editorjs.io/tools-api#render-settings
   *
   * @returns {HTMLElement}
   */
  // renderSettings() {}

  /**
   * Clear Tools stuff: cache, variables, events.
   * Called when Editor instance is destroying.
   * @link https://editorjs.io/tools-api#destroy
   *
   * @returns {void}
   */
  // destroy() {}

  /**
   * Handle content pasted by ways that described by pasteConfig static getter
   * @link https://editorjs.io/tools-api#on-paste
   *
   * @param {PasteEvent} event - event with pasted content
   * @returns {void}
   */
  // onPaste() {}

  /**
   * Specifies how to merge two similar Blocks
   * @link https://editorjs.io/tools-api#merge
   *
   * @param {IParagraphData} data - data of second Block
   * @returns {IParagraphData} - merged data
   */
  // merge() {}

  /**
   * STATIC GETTERS
   *
   * @link https://editorjs.io/tools-api#static-getters
   */

  /**
   * Process pasted content before appending to the Editor
   * @link https://editorjs.io/tools-api#pasteconfig
   *
   * @returns {tags?: string[], files?: { mimeTypes: string[], extensions: string[] }, patterns?: { [string]: RegEx }}
   */
  // static get pasteConfig() {
  //   return {
  //     /**
  //      * Paste HTML into Editor
  //      */
  //     tags: [],

  //     /**
  //      * Paste URL of media into the Editor
  //      */
  //     patterns: {},

  //     /**
  //      * Drag n drop file from into the Editor
  //      */
  //     files: {
  //       mimeTypes: [ ],
  //     },
  //   };
  // }

  /**
   * Clean unwanted HTML tags or attributes
   * @link https://editorjs.io/tools-api#sanitize
   *
   * @returns {{[string]: boolean|object}} - Sanitizer rules
   */
  // static get sanitize() {
  //   return {};
  // }

  /**
   * Describe an icon and title here
   * Required if Tools should be added to the Toolbox
   * @link https://editorjs.io/tools-api#toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox(): { title: string; icon: string } {
    return {
      title: 'Matn',
      icon: IconText,
    };
  }

  /**
   * Shortcut that fires render method and inserts new Block
   * @link https://editorjs.io/tools-api#shortcut
   *
   * @returns {string}
   */
  // static get shortcut() {
  //   // return 'CMD+SHIFT+I';
  // }

  /**
   * Config allows Tool to specify how it can be converted into/from another Tool
   *
   * @link https://editorjs.io/tools-api#conversionconfig
   *
   * @returns {{export: string|function, import: string|function}}
   */
  // static get conversionConfig() {
  //   // return {
  //   //   export: (data) => {
  //   //     return data.items.join('.'); // in this example, all list items will be concatenated to an export string
  //   //   },
  //   //
  //   //   /**
  //   //    * In this example, List Tool creates items by splitting original text by a dot symbol.
  //   //    */
  //   //   import: (string) => {
  //   //     const items = string.split('.');
  //   //
  //   //     return {
  //   //       items: items.filter( (text) => text.trim() !== ''),
  //   //       type: 'unordered'
  //   //     };
  //   //   }
  //   // };
  // }

  /**
   * With this option, Editor.js won't handle Enter keydowns
   * @link https://editorjs.io/tools-api#enablelinebreaks
   *
   * @returns {boolean}
   */
  // static get enableLineBreaks() {
  //   return true;
  // }

  /**
   * This flag tells core that current tool supports the read-only mode
   * @link https://editorjs.io/tools-api#isreadonlysupported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported(): boolean {
    return true;
  }

  /**
   * LIFE CYCLE HOOKS
   *
   * These methods are called by Editor.js core
   * @link https://editorjs.io/tools-api#lifecycle-hooks
   */

  /**
   * Called after Block contents is added to the page
   */
  // rendered() {}

  /**
   * Called each time Block contents is updated
   */
  // updated() {}

  /**
   * Called after Block contents is removed from the page but before Block instance deleted
   */
  // removed() {}

  /**
   * Called after Block is moved by move tunes or through API
   *
   * @param {MoveEvent} event
   */
  // moved(event) {}
}
