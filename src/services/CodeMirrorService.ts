// CodeMirrorService.ts
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { indentOnInput } from "@codemirror/language";
import { EditorState, Prec } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";

type Language = "python" | "javascript" | "markdown";

export default class CodeMirrorService {
  private view: EditorView | null = null;

  initialize(
    element: HTMLDivElement,
    doc: string,
    language: Language,
    onCommand: () => void
  ) {
    const extensions = [
      basicSetup,
      Prec.highest(
        keymap.of([
          {
            key: "Mod-Enter",
            run: () => {
              onCommand();
              return true;
            },
          },
        ])
      ),
      indentOnInput(),
      language === "python"
        ? python()
        : language === "javascript"
        ? javascript()
        : markdown(),
    ];

    this.view = new EditorView({
      state: EditorState.create({
        doc,
        extensions,
      }),
      parent: element,
    });
  }

  destroy() {
    this.view?.destroy();
  }

  getContent(): string {
    return this.view?.state.doc.toString() || "";
  }
}
