import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';

const DataContext = createContext({
    notes: [],
    pages: [],
    getNotes: () => { },
    getPages: () => { },
});

export const useAllDataState = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [pages, setPages] = useState([])

    const getNotes = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/notes`, {
                headers: { 'Content-Type': 'application/json' }
            })
            const data = res.data
            setNotes(data.data.map(note => {
                return {
                    ...note,
                    path: note.path.replace(" ", "%20")
                }
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const getPages = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/pages`, {
                headers: { 'Content-Type': 'application/json' }
            })
            const data = res.data
            setPages(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNotes();
        getPages();
    }, [])

    return (
        <DataContext.Provider value={{
            notes, pages, getNotes, getPages
        }}>
            {children}
        </DataContext.Provider>
    );
};