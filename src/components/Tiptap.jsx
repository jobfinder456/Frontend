'use client'

import StarterKit from '@tiptap/starter-kit'
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
import React, {useCallback} from 'react'
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
    content: `
    ${oldDesc ? oldDesc : `<ul>
    <li> Here goes Job Description</li>
  </ul>`} 
      `,
      onUpdate({ editor }) {
        setDesc(editor.getHTML());
      },
  })

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

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
    <div className='flex flex-col gap-[1rem] p-[1rem]'>

      <div className='flex items-center justify-start gap-[1rem]'>

      
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''} border border-black p-[0.5rem] rounded-[8px]`}
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editor.isActive('italic') ? 'is-active' : ''} border border-black p-[0.5rem] rounded-[8px]`}
      >
        I
      </button>

      {/* Link */}

      <button onClick={setLink} className={`${editor.isActive('link') ? 'is-active' : ''} border border-black p-[0.5rem] rounded-[8px]`}>
        Set Link
      </button>

      <button
        className='border border-black p-[0.5rem] rounded-[8px]'
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        Unset Link
      </button>

      {/* List */}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'is-active' : ''} border border-black p-[0.5rem] rounded-[8px]`}
      >
        List
      </button>

      </div>

      <EditorContent editor={editor} className='border border-black px-[0.5rem] rounded-[8px]' />

    </div>
  )
}

export default Tiptap