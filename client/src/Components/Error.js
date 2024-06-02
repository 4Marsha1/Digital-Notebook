import React from 'react'

const Error = () => {
    return (
        <div className='flex flex-col items-center px-16 py-8 gap-8'>
            <span className='text-4xl text-slate-100'>Uh Oh!</span>
            <span className='text-2xl tracking-wide text-slate-200'>404! Page not found {":("}</span>
        </div>
    )
}

export default Error
