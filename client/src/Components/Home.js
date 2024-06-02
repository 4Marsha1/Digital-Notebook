import React from 'react'
import { useAllDataState } from '../Contexts/dataContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const { pages } = useAllDataState()
    return (
        <div className='flex py-8 px-16 gap-4 flex-wrap'>
            {pages.map((page, index) => page.path.split('/').length < 3 &&
                <Link to={page.path} key={index} className='bg-slate-200 text-slate-800 min-w-[300px] max-w-[400px] px-4 py-2 rounded-lg cursor-pointer font-semibold tracking-wide'>
                    <span>{page.text}</span>
                </Link>)}
        </div>
    )
}

export default Home
