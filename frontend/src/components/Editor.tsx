//this will handle the look of the content (editor)

import { useEditor, EditorContent, type Editor as CoreEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useRef } from 'react'


interface EditorProps {
    content: string;
    onChange: (html: string) => void;
    editable?: boolean
}

//the menuBar component
const MenuBar = ( {editor} : {editor : CoreEditor | null} ) => {

    //creating a reference for the hidden file input
    const fileInputRef = useRef<HTMLInputElement>(null) //this is simply "useRef(null)", but in typescript


    if(!editor) {
        return null
    }
    // helper to apply styles to the buttons - 
    const btnClass = (isActive: boolean) => 
        `px-3 py-1.5 mr-2 text-sm font-bold border-2 border-black transition-all
        ${isActive
            ? 'bg-brand-primary text-white shadow-none translate-y-1' // Active: Pressed down
            : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-peach' // Inactive: 3D Pop
        }`

    //new fn to trigger the hidden file input
    const handleImageClick = ()=> {
        fileInputRef.current?.click() //if the input exists, click it.
    }

    const handleFileChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return;

        const reader = new FileReader() //create a fresh instance of a reader object using browser's inbuilt FileReader 
        reader.onload = (event) => {
            const base64String = event.target?.result as string
            if(base64String) {
                //insert image at current cursor position
                editor.chain().focus().setImage({src: base64String}).run()
            }
        }
        reader.readAsDataURL(file) //"read this file and convert it into base64"
    }
    


    return(
        <div className="border-b p-2 mb-2 flex gap-1 flex-wrap sticky top-0 bg-white z-10">
            <button
            type='button'
                onClick={()=> editor.chain().focus().toggleBold().run()}
                className={btnClass(editor.isActive('bold'))}
                //button toggles its color between isActive being true or false
            >
                B
            </button>
            <button
            type='button'
            onClick={()=> editor.chain().focus().toggleItalic().run()}
            className= {btnClass(editor.isActive('italic'))}
            >
                I
            </button>
            <button
            type='button'
            onClick={()=> editor.chain().focus().toggleHeading({level: 1}).run()}
            className= {btnClass(editor.isActive("heading", {level: 1}))}
            //button toggles its color depending on if H1 is active or not
            >
                H1
            </button>
            <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
            className= {btnClass(editor.isActive('heading', {level:2 }))}
            >
                H2
            </button>
            <button 
            type='button'
            onClick={()=> editor.chain().focus().toggleBlockquote().run()}
            className= {btnClass(editor.isActive('blockquote'))}
            >
                " "
            </button>
            <button
            type='button'
            onClick={()=> editor.chain().focus().toggleBulletList().run()}
            className= {btnClass(editor.isActive('bulletlist'))}
            >
                List
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
            type='button' //stating this because by default a button click will trigger a direct submit
            onClick={handleImageClick} className={btnClass(false)}
            >
                upload🖼️
            </button>
            

            {
                //the hidden input that actually handles the file - 
            }
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden' //hides it from view
                accept='image/*'
            />

        </div>
    )

}

//the editor component (maint thing)
export default function Editor({ content, onChange, editable = true} : EditorProps) {

    //creating the editor instance
    const editor = useEditor( {
        extensions: [ //extension defines the features in our editor - here the starterkit and image upload
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            })
        ], 
        content : content,
        editable: editable, //if editable false - users cannot edit ==> becomes a read only editor (great for onyly viewing purposes)
        editorProps: { //controls the actual editor dom styling and features
            attributes: {
                class: `prose prose-lg focus:outline-none min-h-[400px] max-w-none p-6 font-reading text-gray-800 leading-relaxed prose-headings:font-display prose-headings:uppercase prose-headings:text-black prose-p:mb-4  prose-img:border-4 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] `
                //tailwind typography and styles (like prose)
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML()) //send html back to parent
        }, //(v imp) - whenever user types ==> editor updates ==> onUpdate fn fires ==> extracts html ==> sends it to parent component
    })

    return(
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
            {editable && <MenuBar editor = {editor} />} 
            <EditorContent editor = {editor} />
            
            {
                //shows the menu bar only if editable, alsways shows editor content and also passes the "editor" instance to both
            }            

        </div>
    )

}