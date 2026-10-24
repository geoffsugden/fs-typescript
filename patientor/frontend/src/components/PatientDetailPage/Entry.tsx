import { Box, List, ListItem, Typography } from "@mui/material";
import {
  Favorite,
  FavoriteBorderOutlined,
  HeartBroken,
  MedicalInformation,
  MonitorHeart,
  LocalHospital,
} from "@mui/icons-material";

import type { Diagnosis, Entry } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const healthCheckRatingDisplay = (rating: number) => {
  switch (rating) {
    case 0:
      return <Favorite sx={{ color: "green" }} />;
    case 1:
      return <Favorite sx={{ color: "#FFD300" }} />;
    case 2:
      return <Favorite sx={{ color: "orange" }} />;
    case 3:
      return <HeartBroken sx={{ color: "red" }} />;
    default:
      return <FavoriteBorderOutlined />;
  }
};

const entryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <Typography variant="h5">
            {entry.date} <MonitorHeart sx={{ verticalAlign: "text-bottom", paddingLeft: 1 }} />
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          {healthCheckRatingDisplay(entry.healthCheckRating)}
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Typography variant="h5" display="inline">
            {entry.date} <MedicalInformation sx={{ verticalAlign: "text-bottom", paddingX: 1 }} />
          </Typography>
          <Typography variant="body1" display="inline">
            {entry.employerName}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick Leave Start date: {entry.sickLeave.startDate} <br />
              Sick Leave End date: {entry.sickLeave.endDate}
            </Typography>
          )}
        </div>
      );
    case "Hospital":
      return (
        <div>
          <Typography variant="h5">
            {entry.date} <LocalHospital sx={{ verticalAlign: "text-bottom", paddingLeft: 1 }} />
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          {entry.discharge && (
            <Typography variant="body2">
              Discharge date: {entry.discharge.date} <br />
              Discharge criteria: {entry.discharge.criteria}
            </Typography>
          )}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const Entry = ({ entry, diagnoses }: EntryProps) => {
  return (
    <Box key={entry.date} sx={{ mt: 2, py: 1, pl: 3, border: 1, borderRadius: 10 }}>
      {entryDetails({ entry })}
      {entry.diagnosisCodes && (
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          {entry.diagnosisCodes.map((code) => (
            <ListItem key={code} sx={{ display: "list-item" }}>
              <div
                style={{
                  display: "inline",
                  borderRadius: "5px",
                  padding: "3px",
                  backgroundColor: "#dddddd",
                  fontWeight: "bold",
                }}>
                {code}
              </div>{" "}
              {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="body2">
        diagnosis by <strong>{entry.specialist}</strong>
      </Typography>
    </Box>
  );
};
export default Entry;
