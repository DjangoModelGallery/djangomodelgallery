import { EditorState, Prec } from "@codemirror/state";

import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { indentOnInput } from "@codemirror/language";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { RefObject, useEffect } from "react";

type Language = "python" | "javascript" | "markdown";

function useCodeMirror(
  editorRef: RefObject<HTMLDivElement>,
  doc: string,
  language: Language
) {
  useEffect(() => {
    let view: EditorView | null = null;

    if (editorRef.current) {
      const extensions = [
        basicSetup,
        Prec.highest(
          keymap.of([
            {
              key: "Mod-Enter",
              run: () => {
                console.log("Command executed");
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

      view = new EditorView({
        state: EditorState.create({
          doc,
          extensions,
        }),
        parent: editorRef.current,
      });
    }

    return () => {
      view?.destroy();
    };
  }, [editorRef, doc, language]);
}

export default useCodeMirror;
