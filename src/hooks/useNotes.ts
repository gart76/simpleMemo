import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../types';

const STORAGE_KEY = 'fast-memo-notes';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load notes", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (e) {
            console.error("Failed to save notes", e);
        }
    }, [notes]);

    const addNote = () => {
        const newNote: Note = {
            id: uuidv4(),
            title: '',
            content: '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setNotes(prev => [newNote, ...prev]);
        return newNote.id;
    };

    const updateNote = (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
        setNotes(prev => prev.map(note =>
            note.id === id
                ? { ...note, ...updates, updatedAt: Date.now() }
                : note
        ));
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const getNote = (id: string) => notes.find(n => n.id === id);

    return { notes, addNote, updateNote, deleteNote, getNote };
};
