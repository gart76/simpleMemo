import React, { useState, useEffect, useRef } from 'react';
import type { Note } from '../types';
import { Layout } from './Layout';
import { Trash2 } from 'lucide-react';

interface NoteEditorProps {
    initialNote?: Note;
    onSave: (id: string, title: string, content: string) => void;
    onBack: () => void;
    onDelete: (id: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
    initialNote,
    onSave,
    onBack,
    onDelete,
}) => {
    const [title, setTitle] = useState(initialNote?.title || '');
    const [content, setContent] = useState(initialNote?.content || '');
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!initialNote) {
            const titleInput = document.getElementById('note-title-input');
            titleInput?.focus();
        }
    }, [initialNote]);

    const handleBack = () => {
        if (title.trim() || content.trim()) {
            onSave(initialNote?.id || '', title, content);
        } else if (initialNote) {
            onSave(initialNote.id, title, content);
        }
        onBack();
    };

    const handleDelete = () => {
        if (initialNote) {
            if (confirm("정말 이 메모를 삭제하시겠습니까?")) {
                onDelete(initialNote.id);
                onBack();
            }
        } else {
            onBack();
        }
    };

    return (
        <Layout
            title=""
            showBack
            onBack={handleBack}
            headerRight={
                initialNote && (
                    <button
                        onClick={handleDelete}
                        className="p-2 -mr-2 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                )
            }
        >
            <div className="flex flex-col h-full min-h-[calc(100vh-80px)]">
                <div className="px-6 py-4 border-b border-white/10">
                    <input
                        id="note-title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                        className="w-full bg-transparent border-none outline-none text-[28px] font-bold text-white placeholder:text-gray-500 leading-tight"
                    />
                </div>
                <div className="flex-1 px-6 py-6 pb-20">
                    <textarea
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요..."
                        className="w-full h-full bg-transparent border-none outline-none text-[18px] text-gray-200 placeholder:text-gray-600 leading-relaxed resize-none"
                    />
                </div>
            </div>
        </Layout>
    );
};
