import React from 'react'

const DeleteConfirmation = ({toggleDeleteConfirm,handleDelete}) => {
  return (
    <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full backdrop-blur bg-black/60'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-[300px] sm:w-[400px]'>
            <h2 className='text-2xl font-bold mb-6'>Confirm Deletion</h2>
            <p className='mb-6'>Are you sure you want to delete this branch? This action cannot be undone.</p>
            <div className='flex justify-end gap-4'>
                <button className='bg-gray-300 hover:bg-gray-400 text-black p-2 rounded'
                  onClick={toggleDeleteConfirm}>
                    Cancel
                </button>
                <button className='bg-red-500 hover:bg-red-600 text-white p-2 rounded'
                  onClick={()=>
                    {
                        handleDelete()
                        toggleDeleteConfirm()
                    }}>
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirmation