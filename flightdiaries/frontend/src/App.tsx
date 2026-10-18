import { useEffect, useState } from 'react';
import { type DiaryEntry } from './types';
import diaryService from './services/diaryService';
import DiaryEntryComponent from './components/DiaryEntry';
import AddDiaryEntry from './components/AddDiaryEntry';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setDiaryEntries(initialEntries);
    });
  }, []);

  const displayNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 10_000);
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      {notification && (
        <p style={{ color: 'red' }}>
          <strong>{notification}</strong>
        </p>
      )}
      <h2>Add New Diary Entry</h2>
      <AddDiaryEntry updateEntry={setDiaryEntries} notify={displayNotification} />
      <h2>Diary Entries</h2>
      {diaryEntries.map((entry: DiaryEntry) => (
        <div key={entry.id}>
          <DiaryEntryComponent diaryEntry={entry} />
        </div>
      ))}
    </div>
  );
};

export default App;
