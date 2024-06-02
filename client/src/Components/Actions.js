import React from 'react'
import { ReactComponent as Pen } from "../assets/pen.svg"
import { ReactComponent as Page } from "../assets/page.svg"
import { useLocation, useNavigate } from 'react-router-dom'

const Actions = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    return (
        <div className='fixed bottom-10 flex justify-end gap-4 items-center right-10 w-screen'>
            <button onClick={() => navigate('/createPage', { state: { pathname } })} className='bg-slate-600 p-2 rounded-full flex items-center justify-center shadow-lg'>
                <Page className="w-[40px]" />
            </button>
            <button onClick={() => navigate('/createNote', { state: { pathname } })} className='bg-slate-600 p-2 rounded-full flex items-center justify-center shadow-lg'>
                <Pen className="w-[40px]" />
            </button>
        </div>
    )
}

export default Actions
