import CodeMirrorEditor from "./CodeMirrorEditor.js";

export default class DjangoCodeBlocksEditor extends CodeMirrorEditor {
  constructor(selector, djangoCodeBlocks = [], readOnly = false) {
    super(selector, "", readOnly);
    this.djangoCodeBlocks = djangoCodeBlocks;
  }

  async initialize() {
    try {
      await this.loadCodeMirror();
      const CodemirrorContainer = document.querySelector(this.selector);
      if (CodemirrorContainer) {
        // 탭 컨테이너 생성
        const tabContainer = document.createElement("div");
        tabContainer.classList.add("tab-container");

        // 코드 에디터 컨테이너 생성
        const editorContainer = document.createElement("div");
        editorContainer.classList.add("editor-container");

        // 탭 버튼 생성 및 클릭 이벤트 설정
        this.djangoCodeBlocks.forEach((block, index) => {
          const tabButton = document.createElement("button");
          tabButton.textContent = block.name;
          tabButton.classList.add("tab-button");
          tabButton.addEventListener("click", () => {
            this.setActiveTab(index);
          });
          tabContainer.appendChild(tabButton);
        });

        // 코드 에디터 생성
        this.editor = CodeMirror(editorContainer, {
          lineNumbers: true,
          mode: "python",
          theme: "dracula",
          readOnly: this.readOnly,
        });

        // 초기 코드 블록 설정
        if (this.djangoCodeBlocks.length > 0) {
          this.setActiveTab(0);
          this.editor.setValue(this.djangoCodeBlocks[0].code);
          tabContainer.firstChild.classList.add("active");
        }

        CodemirrorContainer.appendChild(tabContainer);
        CodemirrorContainer.appendChild(editorContainer);

        // 에디터 새로고침
        this.editor.refresh();
      } else {
        console.error("Container for CodeMirror not found:", this.selector);
      }
    } catch (e) {
      console.error("Error initializing CodeMirror:", e);
    }
  }

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
