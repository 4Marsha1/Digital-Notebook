import React from 'react'

const About = () => {
    return (
        <div className='flex justify-center px-16 py-8'>
            <div className='flex flex-col gap-16'>
                <div className='flex flex-col items-center gap-2'>
                    <span className='text-2xl tracking-wide text-slate-100'>A note taking app inspired by Notion!</span>
                    <span className='text-xl font-bold text-slate-200 italic'>This app can store a max of 512MB of data</span>
                </div>
                <div className='flex flex-col gap-0'>
                    <span className='text-xl font-semibold text-slate-100'>Developed with 🤍;</span>
                    <span className='text-lg font-extrabold text-slate-400'><span className='text-slate-200'>© Copyright</span> : Abhishek Bharadwaz 2024</span>
                </div>
            </div>
        </div>
    )
}

export default About
