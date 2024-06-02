import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-around items-center px-16 py-4'>
            <Link to="/" className='text-4xl font-bold tracking-widest text-slate-100'>NoteFy</Link>
            <Link to="/aboutPage" className='text-xl font-semibold tracking-wide text-slate-200'>About</Link>
        </div>
    )
}

export default Navbar
