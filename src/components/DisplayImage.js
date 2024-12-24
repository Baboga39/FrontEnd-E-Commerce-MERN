import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}: {
    imgUrl: string,
    onClose: () => void
}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4'>
      <div className='bg-white shadow-lg rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col'>
        <div className='flex justify-end p-2'>
          <button 
            onClick={onClose}
            className='text-2xl hover:text-red-600 transition-colors duration-200'
            aria-label="Close"
          >
            <CgClose/>
          </button>
        </div>
        <div className='flex-1 overflow-auto p-4'>
          <img 
            src={imgUrl} 
            alt='Full size image' 
            className='max-w-full max-h-full object-contain mx-auto'
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage