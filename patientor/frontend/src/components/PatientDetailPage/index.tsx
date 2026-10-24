import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Button, Container, MenuItem, Select, Typography } from "@mui/material";
import { Transgender, Male, Female } from "@mui/icons-material";
import axios from "axios";

import { Patient, EntryFormValues, EntryType as EntryTypesConst, type Diagnosis, type EntryType } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import Entry from "./Entry";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [patientLoadingStateMessage, setPatientLoadingStateMessage] = useState("Loading Patient Data...");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const paramValue = useParams();
  const patientId = paramValue.id;

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchedDiagnoses = await diagnosesService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };
    void fetchDiagnoses();
  }, []);

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

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const updatedPatient = await patientService.createEntry(values, patientId);
      setPatient(updatedPatient);
      setModalOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.error) {
          const errorDetails = error.response.data.error;
          const message = errorDetails
            .map(
              (issue: { path: (string | number)[]; message: string }) => `${issue.path.join(".")} - ${issue.message}`,
            )
            .join("\n");

          setError(message);
        } else {
          console.error("Unknown error", error);
          setError("Unknown error");
        }
      }
    }
  };

  function handleAddEntry(): void {
    if (!entryType) {
      setError("Please select and Entry Type");
      setTimeout(() => setError(undefined), 5_000);
      return;
    }
    openModal();
  }

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
          <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
        entryType={entryType}
      />

      <Box sx={{ my: 2, mx: 3 }}>
        <Typography variant="h5">New Entry</Typography>
        {error && <Alert severity="warning">{error}</Alert>}
        <Select
          label="Select Entry"
          displayEmpty
          value={entryType}
          onChange={({ target }) => setEntryType(target.value)}>
          {Object.values(EntryTypesConst).map((entryType) => (
            <MenuItem key={entryType} value={entryType}>
              {entryType}
            </MenuItem>
          ))}
        </Select>
        <br />
        <Button variant="contained" onClick={() => handleAddEntry()} sx={{ mt: 2 }}>
          Add New Entry
        </Button>
      </Box>
    </div>
  );
};

export default PatientPage;
