import express, { type Response } from 'express';
import type { NonSensitivePatient } from '../types.ts';
import patientService from '../services/patientService.ts';
import parseNewPatientEntry from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (error) {
    let errorMessage = 'Unable to add patient';
    if (error instanceof Error) {
      errorMessage += ': ' + error.message;
    }
    res.status(500).send(errorMessage);
  }
});
export default router;
