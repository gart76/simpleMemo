import { useState, useEffect } from 'react';
import { useNotes } from './hooks/useNotes';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { Layout } from './components/Layout';
import { BottomNavigation } from './components/BottomNavigation';
import { SplashScreen } from './components/SplashScreen';
import { Search, Settings as SettingsIcon } from 'lucide-react';
import type { ViewState } from './types';

import { Keyboard } from '@capacitor/keyboard';

function App() {
  const { notes, addNote, updateNote, deleteNote, getNote } = useNotes();
  const [view, setView] = useState<ViewState>('home');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  // Handle Keyboard Resize to prevent white background
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => {
      document.body.style.backgroundColor = '#13111C';
      document.documentElement.style.backgroundColor = '#13111C';
    });
    Keyboard.addListener('keyboardWillHide', () => {
      document.body.style.backgroundColor = '#13111C';
      document.documentElement.style.backgroundColor = '#13111C';
    });

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const handleCreateNote = () => {
    setActiveNoteId(null);
    setView('editor');
  };

  const handleNoteClick = (id: string) => {
    setActiveNoteId(id);
    setView('editor');
  };

  const handleBack = () => {
    setView('home');
    setActiveNoteId(null);
  };

  const handleSaveNote = (_id: string, title: string, content: string) => {
    if (activeNoteId) {
      updateNote(activeNoteId, { title, content });
    } else {
      const newId = addNote();
      updateNote(newId, { title, content });
    }
  };

  const activeNote = activeNoteId ? getNote(activeNoteId) : undefined;

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full">
      {view === 'editor' ? (
        <NoteEditor
          initialNote={activeNote}
          onSave={handleSaveNote}
          onBack={handleBack}
          onDelete={deleteNote}
        />
      ) : (
        <Layout
          title={view === 'home' ? 'My Notes' : view === 'search' ? 'Search' : 'Settings'}
          bottomBar={
            <BottomNavigation
              currentView={view}
              onNavigate={setView}
              onCreateNote={handleCreateNote}
            />
          }
        >
          {view === 'home' && (
            <div className="pb-32">
              <NoteList
                notes={notes}
                onCreateNote={handleCreateNote}
                onNoteClick={handleNoteClick}
              />
            </div>
          )}

          {view === 'search' && (
            <div className="px-5 py-4 pb-32">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  autoFocus
                />
              </div>

              {searchQuery && (
                <div className="mb-4 text-sm text-gray-500 font-medium px-1">
                  '{searchQuery}' 검색 결과 ({filteredNotes.length})
                </div>
              )}

              <NoteList
                notes={searchQuery ? filteredNotes : []}
                onCreateNote={handleCreateNote}
                onNoteClick={handleNoteClick}
              />

              {!searchQuery && (
                <div className="flex flex-col items-center justify-center h-[40vh] text-gray-400">
                  <Search size={48} strokeWidth={1.5} className="mb-4 opacity-20" />
                  <p>메모를 검색해보세요</p>
                </div>
              )}
            </div>
          )}

          {view === 'settings' && (
            <div className="px-6 py-8">
              <div className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                    <SettingsIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">SimpleMemo</h3>
                    <p className="text-sm text-gray-400">v1.0.0 • Midnight Bento</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-gray-300 font-medium">Dark Mode</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white/10 text-gray-400 rounded-lg">Default</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-gray-300 font-medium">Backup & Sync</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white/10 text-gray-400 rounded-lg">Soon</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-8">
                Designed with ❤️ by SimpleMemo Team
              </p>
            </div>
          )}
        </Layout>
      )}
    </div>
  );
}

export default App;
