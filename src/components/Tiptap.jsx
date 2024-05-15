'use client'

import StarterKit from '@tiptap/starter-kit'
import { FaListUl } from "react-icons/fa6";
import './tiptap.css'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, {useCallback, useEffect} from 'react'
import { cn } from "@/lib/utils"
import classNames from 'classnames'

const Tiptap = ({setDesc, oldDesc}) => {
  
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn(
          'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
          classNames
        ),
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      BulletList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: '',
      onUpdate({ editor }) {
        setDesc(editor.getHTML());
      },
  })

  useEffect(() => {
    if (editor && oldDesc) {
      editor.commands.setContent(oldDesc, false); // Update content only if oldDesc is not empty
    }
  }, [editor, oldDesc]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Please enter the URL you want to embed "https://..." ', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }


  return (
    <div className='w-[100%] flex flex-col gap-[1rem]'>

      <div className='flex-grow-0 bg-background flex justify-start gap-[1rem] p-[0.5rem] rounded-[12px] text-[1rem]'>
      
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''} bg-white px-[0.75rem] py-[0.5rem] rounded-[8px] font-bold`}
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editor.isActive('italic') ? 'is-active' : ''} bg-white px-[0.75rem] py-[0.5rem] rounded-[8px] font-serif italic`}
      >
        I
      </button>

      {/* List */}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'is-active' : ''} bg-white px-[0.75rem] py-[0.5rem] rounded-[8px]`}
      >
        <FaListUl />
      </button>

      {/* Link */}

      <button onClick={setLink} className={`${editor.isActive('link') ? 'is-active' : ''} bg-white px-[0.75rem] py-[0.5rem] rounded-[8px]`}>
        Set Link
      </button>

      <button
        className='bg-white px-[0.75rem] py-[0.5rem] rounded-[8px]'
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        Unset Link
      </button>

      </div>

      <EditorContent editor={editor} className='form-inp rounded-[8px]' />

    </div>
  )
}

export default Tiptap