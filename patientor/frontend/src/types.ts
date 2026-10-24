export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

type sickLeave = {
  startDate: string;
  endDate: string;
};

type discharge = {
  date: string;
  criteria: string;
};

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

interface HopsitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}

export type Entry = HopsitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export const EntryType = {
  HealthCheck: "HealthCheck",
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
} as const;

export type EntryType = (typeof EntryType)[keyof typeof EntryType];

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, "id">;
