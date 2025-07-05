import { BlockNoteExtension, BlockNoteEditor } from "@blocknote/core";
import { Plugin } from "prosemirror-state";
import { keymap } from "prosemirror-keymap";
import { findParentNode } from "@tiptap/core";

export class CustomKeybindingsExtension extends BlockNoteExtension {
  static key = () => "CustomKeybindingsExtension";
  readonly plugins: Plugin[] = [
    keymap({
      // Find the first checkListItem, and toggle its value.
      // If multiple checkListItems are selected, it will set all of them to
      // the negated value of the first checkListItem
      "Mod-Enter": (state) => {
        const checkListItem = findParentNode(
          (node) => node.type.name === "checkListItem",
        )(state.selection);
        if (!checkListItem) {
          return false;
        }

        const checked = !checkListItem.node.attrs?.checked;

        return this.editor._tiptapEditor.commands.updateAttributes(
          "checkListItem",
          {
            checked,
          },
        );
      },
    }),
  ];
  get priority(): number | undefined {
    return 100;
  }
  constructor(private editor: BlockNoteEditor<any, any, any>) {
    super();
  }
}
