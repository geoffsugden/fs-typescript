import type { DiaryEntry } from '../types';

interface DiaryEntryProps {
  diaryEntry: DiaryEntry;
}

const DiaryEntryComponent = (entry: DiaryEntryProps) => {
  return (
    <div>
      <h3>Diary Entry {entry.diaryEntry.id}</h3>
      <div>
        <strong>Date: </strong> {entry.diaryEntry.date}
      </div>
      <div>
        <strong>Weather: </strong> {entry.diaryEntry.weather}
      </div>
      <div>
        <strong>Visibility: </strong> {entry.diaryEntry.visibility}
      </div>
    </div>
  );
};
export default DiaryEntryComponent;
