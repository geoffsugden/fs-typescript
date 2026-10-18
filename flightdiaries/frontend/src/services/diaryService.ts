import axios from 'axios';
import { z } from 'zod';
import { DiaryEntrySchema, type NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios.get<unknown>(baseUrl).then(({ data }) => {
    const DiaryEntriesSchema = z.array(DiaryEntrySchema);
    return DiaryEntriesSchema.parse(data);
  });
};

const addEntry = (newEntry: NewDiaryEntry) => {
  return axios.post<unknown>(baseUrl, newEntry).then(({ data }) => {
    return DiaryEntrySchema.parse(data);
  });
};

export default { getAll, addEntry };
