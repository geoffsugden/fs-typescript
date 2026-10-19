import { z } from 'zod';

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[];
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string(),
  ssn: z.string().regex(/^\d{6}[^a-z0-9]\d{2,3}[A-Z0-9]$/, 'Invalid SSN format'),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type PatientNoSensitiveData = Omit<Patient, 'ssn' | 'entries'>;
