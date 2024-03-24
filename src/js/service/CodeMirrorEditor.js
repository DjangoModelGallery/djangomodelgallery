import { mermaidMode } from "../lib/codemirror/mermaidMode.js";

export default class CodeMirrorEditor {
  constructor(selector, initialValue = "") {
    this.selector = selector;
    this.initialValue = initialValue;
    this.editor = null;
  }
  async loadCodeMirror() {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/codemirror@5.63.3/lib/codemirror.min.css";
      document.head.appendChild(link);

      const themeLink = document.createElement("link");
      themeLink.rel = "stylesheet";
      themeLink.href =
        "https://cdn.jsdelivr.net/npm/codemirror/theme/dracula.min.css";
      document.head.appendChild(themeLink);

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.4/codemirror.min.js";
      script.onload = () => {
        mermaidMode(CodeMirror);
        const markdownScript = document.createElement("script");
        markdownScript.src =
          "https://cdn.jsdelivr.net/npm/codemirror@5.63.3/mode/markdown/markdown.min.js";
        markdownScript.onload = () => {
          console.log("CodeMirror loaded");
          resolve();
        };
        markdownScript.onerror = (e) => {
          console.error("Error loading CodeMirror markdown mode:", e);
          reject(e);
        };
        document.body.appendChild(markdownScript);
      };
      script.onerror = (e) => {
        console.error("Error loading CodeMirror:", e);
        reject(e);
      };
      document.body.appendChild(script);
    });
  }
  async initialize() {
    try {
      await this.loadCodeMirror();
      const CodemirrorTextarea = document.querySelector(this.selector);
      if (CodemirrorTextarea) {
        this.editor = CodeMirror.fromTextArea(CodemirrorTextarea, {
          lineNumbers: true,
          mode: "mermaid",
          theme: "dracula",
        });
        this.setValue(this.initialValue);

        // 최소 너비 설정
        this.editor.getWrapperElement().style.minWidth = "50%";
        this.editor.getWrapperElement().style.width = "100%";
        this.editor
          .getWrapperElement()
          .classList.add(
            "min-h-screen",
            "h-auto",
            "sticky",
            "top-0",
            "z-10",
            "bg-white",
            "p-4",
            "border",
            "border-gray-300",
            "shadow-lg",
            "hidden-scrollbar",
          );
      } else {
        console.error("Textarea for CodeMirror not found:", this.selector);
      }
    } catch (e) {
      console.error("Error initializing CodeMirror:", e);
    }
  }

  setValue(value) {
    if (this.editor) {
      this.editor.setValue(value);
    }
  }

  getValue() {
    if (this.editor) {
      return this.editor.getValue();
    }
    return null;
  }
}
