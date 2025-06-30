'use client'
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';


type TProps = {
  description?: string,
  setLatestDescription: React.Dispatch<React.SetStateAction<string>>,
}

const TextEditor = ({ description = '', setLatestDescription }: TProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setIsDarkMode(darkModeQuery.matches);

    const handleSystemThemeChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleSystemThemeChange);

    return () => darkModeQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const handleEditorChange = (content: string) => {
    setLatestDescription(content);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
      <Editor
        apiKey="hse6jdzajyfw0s5hi3mxyt9ko0jbem1m7hgcyaqlwaymmany"
        initialValue={`<p>${description || 'Start writing your tech tip here...'}</p>`}
        init={{
          height: 250,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          skin: isDarkMode ? 'oxide-dark' : 'oxide',
          content_css: isDarkMode ? 'dark' : 'default',
          content_style: `
            body { 
              font-family: 'Inter', sans-serif; 
              font-size: 14px; 
              color: ${isDarkMode ? '#E5E7EB' : '#1F2937'}; /* Tailwind gray-200 / gray-900 */
            }
            .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
              color: ${isDarkMode ? '#9CA3AF' : '#6B7280'} !important; /* Tailwind gray-400 / gray-500 */
            }
          `
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
