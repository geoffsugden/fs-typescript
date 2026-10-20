import { v1 as uuid } from "uuid";
import type { Patient, PatientNoSensitiveData, NewPatientEntry } from "../types.ts";
import patientData from "../../data/patients.ts";

const getPatientData = (): Patient[] => {
  return patientData;
};

const getIndividualPatientData = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

const getNonSensitivePatientData = (): PatientNoSensitiveData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
