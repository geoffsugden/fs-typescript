// import diaryService from '../services/diaryService';
import { Weather, Visibility, NewDiaryEntrySchema, type DiaryEntry } from '../types';
import diaryService from '../services/diaryService';

interface AddDiaryEntryProps {
  updateEntry: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  notify: (message: string) => void;
}

const AddDiaryEntry = (props: AddDiaryEntryProps) => {
  const addNewDiaryEntry = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = NewDiaryEntrySchema.safeParse({
      date: formData.get('date'),
      weather: formData.get('weather'),
      visibility: formData.get('visibility'),
      comment: formData.get('comment') || undefined,
    });

    if (result.success) {
      diaryService.addEntry(result.data).then((savedEntry) => {
        props.updateEntry((prevEntries) => [...prevEntries, savedEntry]);
      });
    } else {
      const issues = result.error.issues.map((issue) => `**${issue.path[0].toString()}**: ${issue.message}`);

      props.notify(`Error in one or more of the values submitted: ${issues.join('   |   ')}`);
      console.log('Error in one of the values submitted.', result.error.issues);
    }
  };

  return (
    <div>
      <form onSubmit={addNewDiaryEntry}>
        <div>
          <label htmlFor='date'>Date: </label>
          <input type='date' id='date' name='date' />
        </div>
        <fieldset>
          <legend>Weather: </legend>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
            {Object.entries(Weather).map(([key, value]) => (
              <div key={value}>
                <label htmlFor={value}>{key}</label>
                <input type='radio' value={value} id={value} name='weather' />
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Visibility: </legend>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
            {Object.entries(Visibility).map(([key, value]) => (
              <div key={value}>
                <label htmlFor={value}>{key}</label>
                <input type='radio' value={value} id={value} name='visibility' />
              </div>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor='comment'>Comment: </label>
          <input type='text' id='comment' name='comment' />
        </div>
        <button type='submit'>Add New Entry</button>
      </form>
    </div>
  );
};
export default AddDiaryEntry;
