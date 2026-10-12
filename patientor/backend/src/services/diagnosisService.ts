import diagnosisData from '../../data/diagnoses.ts';
import { type Diagnosis } from '../types.ts';

const data: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

export default {
  getDiagnoses,
};
