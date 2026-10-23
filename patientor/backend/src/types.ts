import { z } from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

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

type HealthCheckRating = (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

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

const NewEntryBaseSchema = z.object({
  description: z.string().min(5),
  date: z.iso.date(),
  specialist: z.string().min(3),
  diagnosisCodes: z.array(z.string()).optional(),
});

const NewHealthCheckEntry = NewEntryBaseSchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const NewOccupationalHealthCareEntry = NewEntryBaseSchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(3),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const NewHospitalEntrySchema = NewEntryBaseSchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string().min(3),
  }),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntry,
  NewHospitalEntrySchema,
  NewOccupationalHealthCareEntry,
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;

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
  ssn: z.string().regex(/^\d{6}[^a-z0-9]\d{2,3}[A-Z0-9]$/, "Invalid SSN format"),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type PatientNoSensitiveData = Omit<Patient, "ssn" | "entries">;
