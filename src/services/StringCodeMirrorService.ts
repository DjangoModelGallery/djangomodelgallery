// StringCodeMirrorService.ts
import { Language } from "@/types/code/codemirror";
import { EditorState } from "@codemirror/state";
import { BaseCodeMirrorService } from "./BaseCodeMirrorService";

// StringCodeMirrorService.ts
export default class StringCodeMirrorService extends BaseCodeMirrorService {
  private state: EditorState;
  private commandHandler: () => void;

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
}
