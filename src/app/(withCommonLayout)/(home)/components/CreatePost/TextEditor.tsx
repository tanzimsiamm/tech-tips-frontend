"use client";
import { useEffect, useRef } from "react";

type TProps = {
  description?: string;
  setLatestDescription: React.Dispatch<React.SetStateAction<string>>;
};

export default function TextEditor({
  description = "",
  setLatestDescription,
}: TProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Update parent when content changes
  const handleInput = () => {
    setLatestDescription(editorRef.current?.innerHTML || "");
  };

  // Load initial content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = description || "";
    }
  }, [description]);

  // Simple toolbar action handler
  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  return (
    <div className="w-full border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        <button
          type="button"
          onClick={() => format("bold")}
          className="px-2 py-1 bg-white dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => format("italic")}
          className="px-2 py-1 bg-white dark:bg-gray-600 rounded italic hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => format("underline")}
          className="px-2 py-1 bg-white dark:bg-gray-600 rounded underline hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => format("insertUnorderedList")}
          className="px-2 py-1 bg-white dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => format("createLink", prompt("Enter URL") || "")}
          className="px-2 py-1 bg-white dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          🔗 Link
        </button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[200px] p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none placeholder-editor"
        data-placeholder="Start writing your post here..."
      />
    </div>
  );
}
