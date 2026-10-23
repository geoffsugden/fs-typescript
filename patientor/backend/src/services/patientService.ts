import { v1 as uuid } from "uuid";
import type { Patient, PatientNoSensitiveData, NewPatientEntry, NewEntry, Entry } from "../types.ts";
import patientData from "../../data/patients.ts";

const getPatientData = (): Patient[] => {
  return patientData;
};

const getIndividualPatientData = (patientId: string): Patient | undefined => {
  return patientData.find((p) => p.id === patientId);
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

const addEntry = (entry: NewEntry, patientId: string): Patient => {
  const patientToUpdate = getIndividualPatientData(patientId);
  if (patientToUpdate) {
    const newEntry: Entry = {
      id: uuid(),
      ...entry,
    };
    patientToUpdate.entries.push(newEntry);
    return patientToUpdate;
  } else {
    throw new Error("Missing or Invalid Patient Id");
  }
};

export default {
  getPatientData,
  getIndividualPatientData,
  getNonSensitivePatientData,
  addPatient,
  addEntry,
};
