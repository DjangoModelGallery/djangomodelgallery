// StringCodeMirrorService.ts
import { Language } from "@/types/code/codemirror";
import { EditorState, StateEffect } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { BaseCodeMirrorService } from "./BaseCodeMirrorService";

export default class StringCodeMirrorService extends BaseCodeMirrorService {
  private state: EditorState;
  private commandHandler: () => void;
  private changeHandler: (content: string) => void = () => {};

  constructor(doc: string, language: Language, commandHandler: () => void) {
    super();
    this.state = this.createEditorState(doc, language);
    this.commandHandler = commandHandler;
  }

  protected getInitialState(): EditorState {
    return this.state;
  }

  protected onCommand(): () => void {
    return this.commandHandler;
  }

  onChange(handler: (content: string) => void) {
    this.changeHandler = handler;
    this.view?.dispatch({
      effects: StateEffect.appendConfig.of(
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const content = this.getContent();
            this.changeHandler(content);
          }
        })
      ),
    });
  }

  update(content: string) {
    this.view?.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: content,
      },
    });
  }

  getContent(): string {
    return this.view?.state.doc.toString() || "";
  }
}
