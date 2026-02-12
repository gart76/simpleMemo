import React, { useState, useEffect, useRef } from 'react';
import type { Note } from '../types';
import type { Theme } from '../hooks/useSettings';
import { Layout } from './Layout';

interface NoteEditorProps {
    initialNote?: Note;
    onSave: (id: string, title: string, content: string) => void;
    onBack: () => void;
    onDelete: (id: string) => void;
    currentTheme: Theme;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
    initialNote,
    onSave,
    onBack,
    onDelete,
    currentTheme
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
            currentTheme={currentTheme}
            headerRight={
                initialNote && (
                    <button onClick={handleDelete} className="btn-text danger z-20 relative">
                        삭제
                    </button>
                )
            }
        >
            <div className="flex flex-col h-full min-h-[calc(100vh-60px)]">
                <div className="px-6 pt-6 pb-2">
                    <input
                        id="note-title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                        className="input-reset editor-title"
                    />
                </div>
                <div className="flex-1 px-6 pb-8">
                    <textarea
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요..."
                        className="input-reset editor-content w-full h-full"
                    />
                </div>
            </div>
        </Layout>
    );
};
