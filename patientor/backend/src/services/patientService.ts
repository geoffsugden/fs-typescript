import { v1 as uuid } from 'uuid';
import type { Patient, PatientNoSensitiveData, NewPatientEntry } from '../types.ts';
import patientData from '../../data/patients.ts';

const patients: Patient[] = patientData;

const getPatientData = (): Patient[] => {
  return patients;
};

const getIndividualPatientData = (id: string): Patient | undefined => {
  return patients.find((p) => (p.id = id));
};

const getNonSensitivePatientData = (): PatientNoSensitiveData[] => {
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
    entries: [],
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientData,
  getIndividualPatientData,
  getNonSensitivePatientData,
  addPatient,
};
