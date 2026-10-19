import axios from 'axios';
import { z } from 'zod';
import { ApiErrorValidationSchema, DiaryEntrySchema, type ApiError, type NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios.get<unknown>(baseUrl).then(({ data }) => {
    const DiaryEntriesSchema = z.array(DiaryEntrySchema);
    return DiaryEntriesSchema.parse(data);
  });
};

const addEntry = async (newEntry: NewDiaryEntry) => {
  return axios
    .post<unknown>(baseUrl, newEntry)
    .then(({ data }) => {
      return DiaryEntrySchema.parse(data);
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        const result = z.array(ApiErrorValidationSchema).safeParse(error.response.data.error);
        if (result.success) {
          console.log('Do we get Here?');

          const errorMessage = error.response.data.error.map((e: ApiError) => {
            return `ERROR ${e.code} in ${e.path[0]} ${e.message} `;
          });
          console.log(errorMessage);
          throw new Error(errorMessage.join(' | '));
        } else {
          // Not sure what happened. Will give generic response to user to avoid accidental inforamtion disclosure and sink error here.
          // A more complete application would implement some back end logging.
          throw new Error('Unknown Error Occured');
        }
      } else {
        // Not sure what happened. Will give generic response to user to avoid accidental inforamtion disclosure and sink error here.
        // A more complete application would implement some back end logging.
        throw new Error('Unknown Error Occured');
      }
    });
};

export default { getAll, addEntry };
