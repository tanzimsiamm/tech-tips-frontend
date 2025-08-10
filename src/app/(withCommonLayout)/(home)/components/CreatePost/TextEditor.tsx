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
    <div className="w-full border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden transition-colors duration-200">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        {[
          { label: <b>B</b>, command: "bold", style: "font-bold" },
          { label: <i>I</i>, command: "italic", style: "italic" },
          { label: <u>U</u>, command: "underline", style: "underline" },
          { label: "• List", command: "insertUnorderedList" },
          { label: "🔗 Link", command: "createLink" },
        ].map(({ label, command, style }, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() =>
              command === "createLink"
                ? format(command, prompt("Enter URL") || "")
                : format(command)
            }
            className={`px-3 py-1 rounded bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200 ${
              style ?? ""
            }`}
            aria-label={typeof label === "string" ? label : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[200px] p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-b-xl placeholder-editor"
        data-placeholder="Start writing your post here..."
        role="textbox"
        aria-multiline="true"
      />
      <style jsx>{`
        .placeholder-editor:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af; /* Tailwind gray-400 */
          pointer-events: none;
          display: block;
        }
        @media (prefers-color-scheme: dark) {
          .placeholder-editor:empty:before {
            color: #d1d5db; /* Tailwind gray-300 */
          }
        }
      `}</style>
    </div>
  );
}
