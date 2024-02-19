import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/css/css";
import "codemirror/mode/go/go";
import "codemirror/mode/sql/sql";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/clike/clike";
import { convert } from "html-to-text";

import CodeMirror from "codemirror";

import { Toolbox, LANGUAGES } from "./constants";
import { CopyIcon, DoneIcon } from "./icons";

export default class Code {
  #language = "javascript";
  #readOnly = false;

  constructor(args) {
    const { data, readOnly, config, api } = args;
    this.data = data;
    this.#readOnly = readOnly ?? false;
    this.config = config;
    this.api = api;
    this.editor = null;

    this.#language = data.language ?? config.defaultLanguage ?? "javascript";
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

  get CSS() {
    return {
      codeContainer: "cdx-editor__container code-editor__container",
      dropdown: "cdx-editor-dropdown",
      dropdownInput: "cdx-editor-dropdown__input",
      dropdownContent: "cdx-editor-dropdown__content",
      langDisplay: "cdx-editor__langDisplay",
      copyButton: "cdx-editor__copyButton",
      header: "cdx-editor__header",
      textArea: "cdx-editor__textarea",
      textAreaContainer: "cdx-editor__textarea-container",
    };
  }

  mountCodeMirror = async (element) => {
    const langsMap = LANGUAGES.reduce((a, c) => {
      return {
        ...a,
        [c.label]: c.value,
      };
    }, {});

    this.editor = CodeMirror.fromTextArea(element, {
      mode: langsMap[this.#language],
      tabSize: 2,
      styleActiveLine: { nonEmpty: true },
      styleActiveSelected: true,
      lineNumbers: false,
      line: false,
      autofocus: false,
      styleSelectedText: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: "dracula",
      autoCloseTags: true,
      foldGutter: true,
      dragDrop: true,
      lint: true,
      extraKeys: { Ctrl: "autocomplete" },
      readOnly: this.#readOnly,
      hintOptions: {
        completeSingle: false,
      },
    });

    this.editor.on("keydown", (cm, event) => {
      if (
        event.key === "Tab" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        event.stopPropagation();
      }
    });

    setTimeout(() => {
      // TODO: focus on the editor only when it is added as a block
      // we should not focus on the editor when an article is loaded and mountet
      // this.editor.focus();
      // this.editor.setCursor(this.editor.lineCount(), 0);
      this.editor.refresh();
    }, 100);
  };

  renderHeader() {
    function renderCopyButton(icon, text) {
      copyButton.innerHTML = "";
      const span = document.createElement("span");
      span.innerHTML = icon;
      span.style.display = "flex";
      span.style.alignItems = "center";
      copyButton.appendChild(span);
      copyButton.append(text);
    }

    this.header = document.createElement("div");
    this.header.classList.add(this.CSS.header);

    this.langDisplay = document.createElement("span");
    this.langDisplay.classList.add(this.CSS.langDisplay);
    this.header.appendChild(this.langDisplay);
    this.langDisplay.innerHTML = this.#language;

    let copyButton = document.createElement("button");
    copyButton.classList.add(this.CSS.copyButton);
    renderCopyButton(CopyIcon, "Nusxalash");

    copyButton.addEventListener("click", async () => {
      renderCopyButton(DoneIcon, "Nusxalandi");
      try {
        await navigator.clipboard.writeText(this.editor.getValue());
      } finally {
        setTimeout(() => {
          renderCopyButton(CopyIcon, "Nusxalash");
        }, 1000);
      }
    });

    this.header.appendChild(copyButton);

    const languageDropdown = this.dropdownRender();
    if (!this.#readOnly) {
      this.langDisplay.addEventListener("click", (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle("show");
      });
    }

    this.container.appendChild(languageDropdown);
    this.languageDropdown = languageDropdown;
    this.container.appendChild(this.header);
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = this.CSS.codeContainer;

    this.renderHeader();

    this.texarea = document.createElement("textarea");
    this.texarea.classList.add(this.CSS.textArea);
    this.texarea.value = this.data.code ?? "// Salom Dunyo";

    const textareaContainer = document.createElement("div");
    textareaContainer.classList.add(this.CSS.textAreaContainer);
    textareaContainer.appendChild(this.texarea);
    this.container.appendChild(textareaContainer);
    this.mountCodeMirror(this.texarea);

    return this.container;
  }

  onSearchLanguages = () => {
    const self = this;
    return function (e) {
      const filter = e.target.value.toUpperCase();
      const a = self.languageDropdown.getElementsByTagName("li");
      for (const element of a) {
        const txtValue = element.textContent || element.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      }
    };
  };

  onPaste(event) {
    switch (event.type) {
      case "pattern":
      case "tag": {
        const tag = event.detail.data;
        if (tag.nodeName !== "PRE") {
          const blocksApi = this.api.blocks
          const index = blocksApi.getCurrentBlockIndex();
          blocksApi.delete(index);
        };
        const code = tag?.innerHTML;
        const htmlCode = convert(code);
        this.editor.setValue(htmlCode);
        break;
      }
    }
  }

  static get pasteConfig() {
    return {
      tags: ["PRE", "BR"],
      patterns: { code: /```([\s\S]+?)```/ },
    };
  }

  static get sanitize() {
    return {
      br: {},
    };
  }

  handleLanguageChange = (lang) => {
    this.#language = lang.label;
    this.langDisplay.innerText = lang.label;

    this.editor.setOption("mode", lang.value);
  };

  dropdownRender = () => {
    const wrapper = document.createElement("div");
    wrapper.className = this.CSS.dropdown;
    const input = document.createElement("input");

    input.className = this.CSS.dropdownInput;
    input.type = "text";
    input.id = "searchInput";
    input.placeholder = "Search language";
    input.addEventListener("keyup", this.onSearchLanguages());

    const dropdownContent = document.createElement("ul");
    dropdownContent.className = this.CSS.dropdownContent;
    dropdownContent.id = "dropdownContent";
    LANGUAGES.forEach((lang) => {
      const item = document.createElement("li");
      item.addEventListener("click", () => {
        this.handleLanguageChange(lang);
        wrapper.classList.remove("show");
      });
      item.innerText = lang.label;
      item.value = lang.value;
      dropdownContent.appendChild(item);
    });

    wrapper.appendChild(input);
    wrapper.appendChild(dropdownContent);

    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("show");
      }
    });

    return wrapper;
  };

  save(blockContent) {
    return {
      code: this.editor.getValue(),
      language: this.#language,
    };
  }
}
