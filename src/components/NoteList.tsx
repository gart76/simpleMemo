import React from 'react';
import type { Note } from '../types';
import type { Theme } from '../hooks/useSettings';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Layout } from './Layout';
import { Plus } from 'lucide-react';

interface NoteListProps {
    notes: Note[];
    onCreateNote: () => void;
    onNoteClick: (id: string) => void;
    currentTheme: Theme;
    onOpenSettings: () => void;
}

export const NoteList: React.FC<NoteListProps> = ({
    notes,
    onCreateNote,
    onNoteClick,
    currentTheme,
    onOpenSettings
}) => {
    return (
        <Layout
            title="SimpleMemo"
            currentTheme={currentTheme}
            onOpenSettings={onOpenSettings}
        >
            <div className="px-4 py-4 pb-24">
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-enter">
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg border border-white/20 ${currentTheme === 'midnight' ? 'bg-white/10' : 'bg-white/50 backdrop-blur-md'}`}>
                            <Plus size={36} className={`${currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-400'}`} />
                        </div>
                        <p className={`text-xl font-bold mb-2 tracking-tight ${currentTheme === 'midnight' ? 'text-white' : 'text-gray-800'}`}>기록을 시작하세요</p>
                        <p className={`text-body max-w-[200px] mx-auto leading-relaxed ${currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-500'}`}>
                            사소한 생각들이 모여<br />위대한 아이디어가 됩니다.
                        </p>
                    </div>
                ) : (
                    <div className="masonry-grid">
                        {notes.map((note, index) => (
                            <div
                                key={note.id}
                                onClick={() => onNoteClick(note.id)}
                                className="note-card group"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="mb-3">
                                    <h3 className={`text-title mb-2 group-hover:text-blue-500 transition-colors ${currentTheme === 'midnight' ? 'text-white' : ''}`}>
                                        {note.title || <span className="opacity-50 italic font-normal">Untitled</span>}
                                    </h3>
                                    <p className={`text-body line-clamp-4 leading-relaxed ${currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {note.content || <span className="opacity-50 text-sm">내용 없음</span>}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100/10 mt-2">
                                    <span className="text-[11px] font-medium opacity-60 uppercase tracking-wider">
                                        {format(note.updatedAt, 'M.d a h:mm', { locale: ko })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={onCreateNote}
                className={`fab hover:rotate-90 transition-transform duration-500 ${currentTheme === 'midnight' ? 'bg-white text-black' : 'bg-black text-white'}`}
                aria-label="Create Note"
            >
                <Plus size={28} strokeWidth={2.5} />
            </button>
        </Layout>
    );
};
