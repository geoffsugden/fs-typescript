import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import patientService from "../../services/patients";

import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { Transgender, Male, Female } from "@mui/icons-material";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const paramValue = useParams();
  const patientId = paramValue.id;

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      const patientToDisplay = await patientService.getById(patientId);
      setPatient(patientToDisplay);
    };
    if (patientId) void fetchPatient(patientId);
  }, [patientId]);

  if (!patient) return <p>No Patient Id Specified</p>;

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
        {patient.entries.map((entry) => {
          return (
            <Box key={entry.date} sx={{ mt: 1 }}>
              <Typography variant="body1">
                {entry.date} {entry.description}
              </Typography>
              {entry.diagnosisCodes && (
                <List sx={{ listStyleType: "disc", pl: 4 }}>
                  {entry.diagnosisCodes.map((code) => (
                    <ListItem key={code} sx={{ display: "list-item" }}>
                      {code}
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          );
        })}
      </Container>
    </div>
  );
};

export default PatientPage;
