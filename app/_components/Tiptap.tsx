import { EditorContent, Editor } from "@tiptap/react";
import ToolBar from "./ToolBar";

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="p-4 border rounded-lg max-w-[500px]">
      <ToolBar editor={editor} />
      <EditorContent
        spellCheck={false}
        editor={editor}
        className="p-4 border rounded-lg w-full h-[300px] overflow-y-scroll outline-none"
      />
    </div>
  );
};
export default Tiptap;
