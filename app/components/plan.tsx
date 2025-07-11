import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  PartialBlock,
} from "@blocknote/core";
import { CustomKeybindingsExtension } from "../lib/editor/keyboard-shortcuts";

export type Content = PartialBlock<
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema
>[];

export default function PlanBlock({
  initialContent,
  onContentChange,
}: {
  initialContent: Content | undefined;
  onContentChange: (content: Content) => void;
}) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    animations: false,
    initialContent: initialContent?.length === 0 ? undefined : initialContent,
    extensions: [(editor) => new CustomKeybindingsExtension(editor)],
  });

  // Renders the editor instance using a React component.
  return (
    <div>
      <h1 className="font-bold text-xl ml-[54px]">Plan:</h1>
      <BlockNoteView
        editor={editor}
        onChange={(editor) => onContentChange(editor.document)}
      />
    </div>
  );
}
