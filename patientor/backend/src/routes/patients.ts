import express, { type Request, type Response } from "express";
import type { PatientNoSensitiveData, NewPatientEntry, Patient, NewEntry } from "../types.ts";
import patientService from "../services/patientService.ts";
import { errorMiddleWare, newPatientParser, newEntryParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNoSensitiveData[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get("/:id", (req, res: Response<Patient>) => {
  res.send(patientService.getIndividualPatientData(req.params.id));
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientNoSensitiveData>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.status(200).json(addedPatient);
  },
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>) => {
    const updatedPatient = patientService.addEntry(req.body, req.params.id);
    res.status(200).json(updatedPatient);
  },
);

router.use(errorMiddleWare);

export default router;
