import React from 'react'

const Text = ({ note }) => {
    const getCodeBlock = (code) => {
        return code.split('\\n').map((line, index) => (
            <span key={index}>
                {(line)}
                <br />
            </span>
        ));
    }

    const createBlock = (note) => {
        switch (note.type) {
            case 'h1': return <span className='text-2xl font-bold'>{note.text}</span>
            case 'h2': return <span className='text-xl font-semibold'>{note.text}</span>
            case 'h3': return <span className='text-lg font-medium'>{note.text}</span>
            case 'p': return <span className='text-sm'>{note.text}</span>
            case 'code': return <pre className="bg-gray-800 text-white p-4 rounded-lg w-full">
                <code className="font-mono">
                    {getCodeBlock(note.text)}
                </code>
            </pre>
            default: return <span>{note.text}</span>
        }
    }
    return (
        <div className='w-[1100px]'>
            {createBlock(note)}
        </div>
    )
}

export default Text
