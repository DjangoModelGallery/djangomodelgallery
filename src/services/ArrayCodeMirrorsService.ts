// CodeMirrorsService.ts
import { Language } from "@/types/code/codemirror";
import { EditorState } from "@codemirror/state";
import { BaseCodeMirrorService } from "./BaseCodeMirrorService";

export default class ArrayCodeMirrorService extends BaseCodeMirrorService {
  private states: EditorState[];
  private currentIndex: number;

  constructor(docs: string[], language: Language) {
    super();
    this.states = docs.map((doc) => this.createEditorState(doc, language));
    this.currentIndex = 0;
  }

  protected getInitialState(): EditorState {
    return this.states[this.currentIndex];
  }

  switchDocument(index: number) {
    if (!this.view || index >= this.states.length || index < 0) return;
    this.currentIndex = index;
    this.view.setState(this.states[index]);
  }
}
