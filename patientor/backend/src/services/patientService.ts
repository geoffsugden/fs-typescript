import { v1 as uuid } from 'uuid';
import type { Patient, NonSensitivePatient, NewPatientEntry } from '../types.ts';
import patientData from '../../data/patients.ts';

const patients: Patient[] = patientData;

const getPatientData = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientData,
  getNonSensitivePatientData,
  addPatient,
};
