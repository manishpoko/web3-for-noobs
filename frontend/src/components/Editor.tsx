import {
  useEditor,
  EditorContent,
  type Editor as CoreEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useRef } from "react";

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
  editable?: boolean;
}

//  THE CYBER MENU BAR --
const MenuBar = ({ editor }: { editor: CoreEditor | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  // Cyber Button Styles(helper)
  const btnClass = (isActive: boolean) =>
    `px-3 py-1.5 mr-2 text-sm font-mono font-bold border transition-all duration-200
        ${
          isActive
            ? "bg-acid text-black border-acid shadow-[0_0_10px_rgba(204,255,0,0.5)]" // Active: Glowing Green
            : "bg-black text-gray-400 border-white/20 hover:border-acid hover:text-acid" // Inactive: Dim
        }`;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (base64String) {
        editor.chain().focus().setImage({ src: base64String }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border-b border-white/10 p-2 mb-2 flex gap-1 flex-wrap sticky top-0 bg-black/90 backdrop-blur-sm z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editor.isActive("heading", { level: 1 }))}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
      >
        ""
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        LIST
      </button>

      <div className="w-px h-6 bg-white/20 mx-2"></div>

      <button
        type="button"
        onClick={handleImageClick}
        className={btnClass(false)}
      >
        [ UPLOAD_IMG ]
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

// -MAIN EDITOR -
export default function Editor({
  content,
  onChange,
  editable = true,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,
    editable: editable,
editorProps: {
  attributes: {
    class: "prose prose-invert prose-lg max-w-none p-6 focus:outline-none min-h-[400px] font-sans text-gray-300 leading-relaxed prose-headings:font-mono prose-headings:text-acid prose-headings:uppercase prose-p:mb-4 prose-img:border-2 prose-img:border-acid/50 prose-img:rounded-none prose-img:shadow-[0_0_15px_rgba(204,255,0,0.1)] prose-blockquote:border-l-acid prose-blockquote:bg-white/5 prose-blockquote:not-italic prose-blockquote:px-4"
  },
},

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-white/20 bg-black shadow-none mt-2">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
