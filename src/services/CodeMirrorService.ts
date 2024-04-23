// CodeMirrorService.ts
import { Language } from "@/types/code/codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { dot } from "@viz-js/lang-dot";
import { basicSetup } from "codemirror";

export default class CodeMirrorService {
  private view: EditorView | null = null;
  private states: EditorState[];
  private currentIndex: number;

  constructor(docs: string[], language: Language) {
    this.states = docs.map((doc) => this.createEditorState(doc, language));
    this.currentIndex = 0;
  }

  private createEditorState(doc: string, language: Language): EditorState {
    const extensions: Extension[] = [
      basicSetup,
      this.getLanguageExtension(language),
      keymap.of([{ key: "Mod-Enter", run: this.onCommand.bind(this) }]),
    ];
    return EditorState.create({ doc, extensions });
  }

  initialize(element: HTMLDivElement) {
    if (this.states.length === 0) return;
    this.view = new EditorView({
      state: this.states[this.currentIndex],
      parent: element,
    });
  }

  switchDocument(index: number) {
    if (!this.view || index >= this.states.length || index < 0) return;
    this.currentIndex = index;
    this.view.setState(this.states[index]);
  }

  destroy() {
    this.view?.destroy();
  }

  getContent(): string {
    if (!this.view) return "";
    return this.view.state.doc.toString();
  }

  private getLanguageExtension(language: Language): Extension {
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

  private onCommand() {
    console.log("Command Executed");
    return true;
  }
}
