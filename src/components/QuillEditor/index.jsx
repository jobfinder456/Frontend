"use client";

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const QuillNoSSR = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const QuillEditor = ({ value, onChange, editorClassName, toolbarClassName }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
    ],
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.root.setAttribute('spellcheck', 'false');
    }
  }, []);

  return (
    <div className={`quill-wrapper ${toolbarClassName}`}>
      <QuillNoSSR
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className={` ${editorClassName}`}
      />
    </div>
  );
};

export default QuillEditor;