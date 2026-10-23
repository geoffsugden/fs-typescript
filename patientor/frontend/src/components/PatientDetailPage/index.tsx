import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import patientService from "../../services/patients";

import { Container, Typography } from "@mui/material";
import { Transgender, Male, Female } from "@mui/icons-material";
import axios from "axios";
import Entry from "./Entry";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [patientLoadingStateMessage, setPatientLoadingStateMessage] = useState("Loading Patient Data...");

  const paramValue = useParams();
  const patientId = paramValue.id;

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      setPatient(undefined);
      setPatientLoadingStateMessage("Loading Patient Data...");
      try {
        const patientToDisplay = await patientService.getById(patientId);
        setPatient(patientToDisplay);
        setPatientLoadingStateMessage("Patient Loaded");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setPatientLoadingStateMessage("Patient Id not found.");
        } else {
          setPatientLoadingStateMessage("Unknown error loading patient data.");
        }
      }
    };
    if (patientId) void fetchPatient(patientId);
  }, [patientId]);
  if (!patientId) return <p>No Patient ID specified</p>;
  if (!patient) return <p>{patientLoadingStateMessage}</p>;

  return (
    <div className="patient">
      <Container>
        <Typography variant="h4">
          {patient.name}
          {patient.gender === "male" ? (
            <Male sx={{ fontSize: "inherit", verticalAlign: "text-bottom", ml: 2 }} />
          ) : patient.gender === "female" ? (
            <Female sx={{ fontSize: "inherit", verticalAlign: "text-bottom", ml: 2 }} />
          ) : (
            <Transgender sx={{ fontSize: "inherit", verticalAlign: "text-bottom", ml: 2 }} />
          )}
        </Typography>

        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>
          entries
        </Typography>
        {patient.entries.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;
