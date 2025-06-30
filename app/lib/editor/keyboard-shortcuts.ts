import {
  Extension,
  findParentNode,
  KeyboardShortcutCommand,
} from "@tiptap/core";

export const CustomKeybindingsExtension = Extension.create({
  addKeyboardShortcuts(): {
    [key: string]: KeyboardShortcutCommand;
  } {
    return {
      // Find the first checkListItem, and toggle its value.
      // If multiple checkListItems are selected, it will set all of them to
      // the negated value of the first checkListItem
      "Mod-Enter": ({ editor }) => {
        const checkListItem = findParentNode(
          (node) => node.type.name === "checkListItem",
        )(editor.state.selection);
        if (!checkListItem) {
          return false;
        }
        return editor.commands.updateAttributes("checkListItem", {
          checked: !checkListItem.node.attrs?.checked,
        });
      },
    };
  },
});
