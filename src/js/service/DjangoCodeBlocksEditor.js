import CodeMirrorEditor from "./CodeMirrorEditor.js";

/**
 * Django 코드 블록 에디터 클래스입니다.
 * @class
 */
export default class DjangoCodeBlocksEditor extends CodeMirrorEditor {
  /**
   * DjangoCodeBlocksEditor 클래스의 생성자입니다.
   * @constructor
   * @param {string} selector - 에디터가 삽입될 엘리먼트의 선택자
   * @param {Object[]} djangoCodeBlocks - Django 코드 블록 배열
   * @param {boolean} readOnly - 읽기 전용 여부
   */
  constructor(selector, djangoCodeBlocks = [], readOnly = false) {
    super(selector, "", readOnly);
    this.djangoCodeBlocks = djangoCodeBlocks;
  }

  /**
   * 에디터를 초기화하는 메서드입니다.
   * @async
   */
  async initialize() {
    try {
      await this.loadCodeMirror();
      const CodemirrorContainer = document.querySelector(this.selector);
      if (CodemirrorContainer) {
        /**
         * 탭 컨테이너를 생성합니다.
         */
        const tabContainer = document.createElement("div");
        tabContainer.classList.add("tab-container");

        /**
         * 코드 에디터 컨테이너를 생성합니다.
         */
        const editorContainer = document.createElement("div");
        editorContainer.classList.add("editor-container");

        /**
         * 탭 버튼을 생성하고 클릭 이벤트를 설정합니다.
         */
        this.djangoCodeBlocks.forEach((block, index) => {
          if (block.name !== "") {
            const tabButton = document.createElement("button");
            tabButton.textContent = block.name;
            tabButton.classList.add("tab-button");
            tabButton.addEventListener("click", () => {
              this.setActiveTab(index);
            });
            tabContainer.appendChild(tabButton);
          }
        });

        /**
         * 코드 에디터를 생성합니다.
         */
        this.editor = CodeMirror(editorContainer, {
          lineNumbers: true,
          mode: "python",
          theme: "dracula",
          readOnly: this.readOnly,
        });

        if (this.djangoCodeBlocks.length > 0) {
          const firstNonEmptyIndex = this.djangoCodeBlocks.findIndex(
            (block) => block.name !== "",
          );
          if (firstNonEmptyIndex !== -1) {
            this.setActiveTab(firstNonEmptyIndex);
            this.editor.setValue(
              this.djangoCodeBlocks[firstNonEmptyIndex].code,
            );
            tabContainer.children[firstNonEmptyIndex].classList.add("active");
          }
        }

        CodemirrorContainer.appendChild(tabContainer);
        CodemirrorContainer.appendChild(editorContainer);

        this.editor.refresh();
      } else {
        console.error("Container for CodeMirror not found:", this.selector);
      }
    } catch (e) {
      console.error("Error initializing CodeMirror:", e);
    }
  }

  /**
   * 활성 탭을 설정하는 메서드입니다.
   * @param {number} index - 활성화할 탭의 인덱스
   */
  setActiveTab(index) {
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button, i) => {
      if (i === index) {
        button.classList.add("active");
        this.setValue(this.djangoCodeBlocks[i].code);
      } else {
        button.classList.remove("active");
      }
    });
  }
}
