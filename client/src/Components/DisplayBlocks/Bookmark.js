import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Utils/constants';

const Bookmark = ({ note }) => {
    const [metadata, setMetadata] = useState({});
    const fetchMetadata = async (url) => {
        try {
            const res = await axios.post(`${BASE_URL}/fetch-metadata`, {
                url
            }, {
                headers: { 'Content-Type': 'application/json' },
            })
            const data = res.data
            setMetadata(data)
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchMetadata(note.text);
    }, [note])

    const openUrlInNewTab = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className='flex justify-between bg-slate-400 rounded-lg w-[1100px] cursor-pointer' onClick={() => openUrlInNewTab(note?.text)}>
            <div className='flex flex-col gap-1 px-8 py-4'>
                <span className='font-semibold text-slate-900'>{metadata?.title}</span>
                <span className='text-xs font-medium text-slate-700'>{metadata?.description}</span>
                <span className='text-xs font-medium text-slate-900'>{metadata?.url.slice(0, 90)}...</span>
            </div>
            <img src={metadata?.imageUrl} alt='metadata' className='w-[170px] max-h-[120px]' />
        </div>
    )
}

export default Bookmark
