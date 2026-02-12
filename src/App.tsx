import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { useSettings } from './hooks/useSettings';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { SettingsModal } from './components/SettingsModal';

type ViewState = 'list' | 'editor';

function App() {
  const { notes, addNote, updateNote, deleteNote, getNote } = useNotes();
  const { theme, setTheme } = useSettings();
  const [view, setView] = useState<ViewState>('list');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCreateNote = () => {
    setActiveNoteId(null); // Null means new note
    setView('editor');
  };

  const handleNoteClick = (id: string) => {
    setActiveNoteId(id);
    setView('editor');
  };

  const handleBackToList = () => {
    setView('list');
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

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {view === 'list' && (
        <NoteList
          notes={notes}
          onCreateNote={handleCreateNote}
          onNoteClick={handleNoteClick}
          currentTheme={theme}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}
      {view === 'editor' && (
        <NoteEditor
          initialNote={activeNote}
          onSave={handleSaveNote}
          onBack={handleBackToList}
          onDelete={deleteNote}
          currentTheme={theme}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </div>
  );
}

export default App;
