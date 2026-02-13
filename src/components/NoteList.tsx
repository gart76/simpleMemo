import React from 'react';
import type { Note } from '../types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Plus } from 'lucide-react';

interface NoteListProps {
    notes: Note[];
    onCreateNote: () => void;
    onNoteClick: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({
    notes,
    onCreateNote,
    onNoteClick,
}) => {
    return (
        <>
            <div className="px-4 py-4">
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-enter">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-surface border border-white/5 shadow-2xl shadow-primary/10">
                            <Plus size={40} className="text-gray-600" />
                        </div>
                        <p className="text-xl font-bold mb-2 tracking-tight text-white">No memos yet</p>
                        <p className="text-gray-500 text-sm">Tap the + button to capture your ideas.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Pinned / Latest Note - Full Width */}
                        {notes.length > 0 && (
                            <div
                                onClick={() => onNoteClick(notes[0].id)}
                                className="relative overflow-hidden rounded-3xl bg-surface border border-white/5 p-6 cursor-pointer group active:scale-[0.98] transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50 rotate-12">
                                    <div className="w-20 h-20 bg-primary/20 blur-2xl rounded-full" />
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-full bg-primary text-[10px] font-bold tracking-wider text-white uppercase">Pinned</span>
                                    <span className="text-gray-500 text-xs">{format(notes[0].updatedAt, 'h:mm a', { locale: ko })}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{notes[0].title || "Untitled"}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{notes[0].content || "No content"}</p>
                            </div>
                        )}

                        {/* Bento Grid for remaining notes */}
                        <div className="grid grid-cols-2 gap-3">
                            {notes.slice(1).map((note, index) => (
                                <div
                                    key={note.id}
                                    onClick={() => onNoteClick(note.id)}
                                    className="relative flex flex-col justify-between p-5 rounded-[24px] bg-surface border border-white/5 cursor-pointer group hover:bg-[#252238] transition-colors active:scale-[0.98] duration-200 aspect-[4/5]"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                        </div>
                                        <h3 className="text-base font-semibold text-white mb-1 line-clamp-2 leading-snug">
                                            {note.title || <span className="opacity-50 italic">Untitled</span>}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-3 mt-2">
                                            {note.content}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-[10px] text-gray-600 font-medium">
                                            {format(note.updatedAt, 'MMM d', { locale: ko })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
