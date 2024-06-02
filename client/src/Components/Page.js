import React from 'react'
import { Link } from 'react-router-dom';
import { useAllDataState } from '../Contexts/dataContext';
import Bookmark from './DisplayBlocks/Bookmark';
import Text from './DisplayBlocks/Text';

const Page = ({ page }) => {
    const { pages, notes } = useAllDataState();
    const crumbs = page.path.split('/').filter(crumb => crumb !== '');

    const childrenPages = pages.filter(childPage => childPage.path.split('/')[1] === page.path.split('/')[1] && page.path.split('/').length + 1 === childPage.path.split('/').length)

    const childNotes = notes.filter(childNote => childNote.path.replace("%20", " ") === page.path)

    return (
        <div className='flex flex-col px-16 py-8 gap-4 text-slate-100'>
            <div className='flex gap-2 items-center'>
                <Link to="/" className='text-lg font-semibold text-slate-100'>Home</Link>
                {crumbs.map((crumb, idx) => {
                    const routeTo = `/${crumbs.slice(0, idx + 1).join('/')}`;
                    const isLast = idx === crumbs.length - 1;
                    return isLast ? <div key={idx} className='flex gap-2'>
                        <span className='font-semibold'>{"/"}</span>
                        <Link className="font-bold text-blue-400 text-lg">{crumb}</Link>
                    </div> : <div key={idx} className='flex gap-2'>
                        <span className='font-semibold'>{"/"}</span>
                        <Link to={routeTo} className="font-semibold text-slate-100 text-lg">{crumb}</Link>
                    </div>
                })}
            </div>
            <div className='flex flex-col gap-5'>
                {page.cover && <img src={page.cover} alt="cover" className='h-[200px] w-screen object-cover' />}
                <span className='text-3xl font-semibold text-slate-100'>{page.text}</span>
            </div>
            <div className='flex flex-wrap gap-4'>
                {childrenPages.map((page, index) =>
                    <Link to={page.path} key={index} className='bg-slate-200 text-slate-800 min-w-[300px] max-w-[400px] px-4 py-2 rounded-lg cursor-pointer font-semibold tracking-wide'>
                        <span>{page.text}</span>
                    </Link>)}
            </div>

            {/* Notes  */}
            <div className='flex flex-col gap-2'>
                {childNotes.map((note, idx) => {
                    switch (note.type) {
                        case 'h1': return <Text note={note} />;
                        case 'h2': return <Text note={note} />;
                        case 'h3': return <Text note={note} />;
                        case 'p': return <Text note={note} />;
                        case 'code': return <Text note={note} />;
                        case 'bookmark': return <Bookmark note={note} />;
                        default: return <span>{note.text}</span>;
                    }
                })}
            </div>
        </div>
    )
}

export default Page
