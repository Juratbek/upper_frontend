export class Selection {
  public static get selection() {
    return document.getSelection();
  }

  public static get text() {
    return this.selection?.toString();
  }

  public static get range() {
    return this.selection?.getRangeAt(0).cloneRange();
  }

  public static get rect() {
    return this.range?.getBoundingClientRect();
  }

  public static findParentTag(
    tagName: keyof HTMLElementTagNameMap,
    className?: string,
    searchDepth = 5,
  ): HTMLElement | null {
    const selection = window.getSelection();
    let parentTag = null;

    /**
     * If selection is missing or no anchorNode or focusNode were found then return null
     */
    if (!selection || !selection.anchorNode || !selection.focusNode) {
      return null;
    }

    /**
     * Define Nodes for start and end of selection
     */
    const boundNodes = [
      /** the Node in which the selection begins */
      selection.anchorNode as HTMLElement,
      /** the Node in which the selection ends */
      selection.focusNode as HTMLElement,
    ];

    /**
     * For each selection parent Nodes we try to find target tag [with target class name]
     * It would be saved in parentTag variable
     */
    for (let i = 0; i < boundNodes.length; i++) {
      let parent = boundNodes[i];
      /** Reset tags limit */
      let searchDepthIterable = searchDepth;

      while (searchDepthIterable > 0 && parent.parentNode) {
        /**
         * Check tag's name
         */
        console.log('🚀 ~ Selection ~ parent.tagName:', parent.tagName);
        if (parent.tagName === tagName.toUpperCase()) {
          /**
           * Save the result
           */
          parentTag = parent;

          /**
           * Optional additional check for class-name mismatching
           */
          if (className && parent.classList && !parent.classList.contains(className)) {
            parentTag = null;
          }

          /**
           * If we have found required tag with class then go out from the cycle
           */
          if (parentTag) {
            break;
          }
        }

        /**
         * Target tag was not found. Go up to the parent and check it
         */
        parent = parent.parentNode as HTMLElement;
        searchDepthIterable--;
      }
    }

    /**
     * Return found tag or null
     */
    return parentTag;
  }

  public static expandToTag(element: HTMLElement): void {
    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    const range = document.createRange();

    range.selectNodeContents(element);
    selection.addRange(range);
  }
}
