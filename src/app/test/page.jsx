"use client"
import Tiptap from '@/components/Tiptap'
import React, { useEffect, useState } from 'react'

function page() {

  const [desc, setDesc] = useState("")

  useEffect(() => {
    console.log(desc)
  },[desc])

  function onPrint() {
    console.log(desc)
  }

  return (
    <div>
        
        <Tiptap setDesc={setDesc} />
        <button onClick={onPrint}>print in parent</button>

    </div>
  )
}

export default page