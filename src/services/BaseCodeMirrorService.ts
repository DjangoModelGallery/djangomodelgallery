// BaseCodeMirrorService.ts
import { Language } from "@/types/code/codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { dot } from "@viz-js/lang-dot";
import { gruvboxDark } from "cm6-theme-gruvbox-dark";
import { basicSetup } from "codemirror";

export abstract class BaseCodeMirrorService {
  protected view: EditorView | null = null;

  protected createEditorState(doc: string, language: Language): EditorState {
    const extensions: Extension[] = [
      basicSetup,
      this.getLanguageExtension(language),
      keymap.of([
        {
          key: "Mod-Enter",
          run: (view: EditorView) => {
            this.onCommand();
            return true;
          },
        },
      ]),
    ];
    return EditorState.create({ doc, extensions });
  }
  initialize(element: HTMLDivElement) {
    this.view = new EditorView({
      state: this.getInitialState(),
      extensions: gruvboxDark,
      parent: element,
    });
  }

  destroy() {
    this.view?.destroy();
  }

  getContent(): string {
    if (!this.view) return "";
    return this.view.state.doc.toString();
  }

  protected getLanguageExtension(language: Language): Extension {
    switch (language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "markdown":
        return markdown();
      case "dot":
        return dot();
      default:
        return [];
    }
  }

  protected onCommand(): () => void {
    return () => {
      // 함수 본문
    };
  }

  protected abstract getInitialState(): EditorState;
}
