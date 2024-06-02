import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Utils/constants';
import { useAllDataState } from '../Contexts/dataContext';

const CreatePage = () => {
    const { state } = useLocation();
    const [text, setText] = useState('')
    const [cover, setCover] = useState('')
    const { getPages } = useAllDataState()
    const navigate = useNavigate();

    const createPage = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/pages`, {
                text: text,
                cover: cover,
                path: `${state?.pathname === '/' ? state?.pathname + text : state?.pathname + '/' + text}`
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = res.data
            getPages()
            navigate(state?.pathname)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-4 px-16 py-8'>
                <span className='text-3xl font-semibold text-slate-100 w-[600px]'>Add Page to ${state.pathname.replace("%20", ' ')}</span>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-sm font-medium text-slate-200'>Page Name *</span>
                    <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)}
                        className='bg-slate-300 px-6 py-2 rounded-lg outline-none' placeholder='Page name'
                    />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-sm font-medium text-slate-200'>Cover Image</span>
                    <input type="text" name="cover" value={cover} onChange={(e) => setCover(e.target.value)}
                        className='bg-slate-300 px-6 py-2 rounded-lg outline-none' placeholder='Cover image' />
                </div>
            </div>
            <button className='bg-slate-500 text-white py-2 w-[200px] rounded-lg font-bold text-lg' onClick={createPage}>Create Page</button>
        </div>
    )
}

export default CreatePage
