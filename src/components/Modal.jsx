import React from 'react'

function Modal({ title, button1Title, button2Title, button1Action, button2Action }) {
  return (
    <div className='z-50 fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[25rem] bg-white p-[1rem] flex flex-wrap justify-evenly items-center gap-[2rem] rounded-[16px] shadow-[0px_0px_16px_4px_rgba(0,0,0,0.1)]'>
          <h1 className='text-[1rem] w-[100%] text-center font-medium mt-[0.5rem] md:mt-[1rem] leading-[1.2rem]'>{title}</h1>
          <div className='w-[100%] flex justify-between gap-[1rem]'>

          <button onClick={button1Action} className={`button-secondary flex-grow ${button2Title == 'false' ? 'bg-base-1 text-white': null}`}>{button1Title}</button>
          {button2Title != 'false' && (
            <button onClick={button2Action} className='flex-grow button-primary bg-accent-red-2 text-accent-red-1 border-accent-red-1'>
              {button2Title}
            </button>
        )}
            </div>
          
    </div>
  )
}

export default Modal