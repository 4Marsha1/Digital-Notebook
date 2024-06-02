import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, OPTIONS } from '../Utils/constants';
import { useAllDataState } from '../Contexts/dataContext';

const CreateNote = () => {
    const { state } = useLocation();
    const [text, setText] = useState('')
    const [type, setType] = useState('')
    const { getNotes } = useAllDataState()
    const navigate = useNavigate();

    const createNote = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/notes`, {
                text: text,
                type: type,
                path: `${state?.pathname}`
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = res.data
            getNotes()
            navigate(state?.pathname)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-4 px-16 py-8'>
                <span className='text-3xl font-semibold text-slate-100 w-[600px]'>Add Note to {state?.pathname.replace("%20", " ")}</span>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-sm font-medium text-slate-200'>Note Name *</span>
                    <textarea rows={10} type="text" name="text" value={text} onChange={(e) => setText(e.target.value)}
                        className='bg-slate-300 px-6 py-2 rounded-lg outline-none' placeholder='Note name'
                    />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-sm font-medium text-slate-200'>Type</span>
                    <select id="dropdown" value={type} onChange={(e) => setType(e.target.value)} className='bg-slate-300 px-6 py-2 rounded-lg outline-none'>
                        <option value="" disabled>
                            -- Select an option --
                        </option>
                        {OPTIONS.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button className='bg-slate-500 text-white py-2 w-[200px] rounded-lg font-bold text-lg' onClick={createNote}>Create Note</button>
        </div>
    )
}

export default CreateNote
