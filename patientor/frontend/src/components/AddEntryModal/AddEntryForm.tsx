import { useState, type SyntheticEvent } from "react";

import { TextField, MenuItem, Select, Grid, Button, InputLabel, Box, Chip } from "@mui/material";

import { type Diagnosis, type EntryFormValues, type EntryType, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
  entryType: EntryType;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses, entryType }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStartDate && sickLeaveEndDate
            ? {
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                },
              }
            : {}),
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel shrink htmlFor="date">
          Date
        </InputLabel>
        <TextField
          type="date"
          id="date"
          name="Date"
          fullWidth
          required
          value={date}
          variant="outlined"
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel shrink htmlFor="description">
          Description
        </InputLabel>
        <TextField
          id="description"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel shrink htmlFor="specialist">
          Specialist
        </InputLabel>
        <TextField
          id="specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {entryType === "HealthCheck" && (
          <div>
            <InputLabel id="healthCheck" shrink htmlFor="healthCheck">
              Health Check Rating (0-3)
            </InputLabel>
            <Select
              label="Health Check Rating (0-3)"
              fullWidth
              required
              labelId="healthCheck"
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}>
              {Object.entries(HealthCheckRating).map(([label, value]) => (
                <MenuItem key={value} value={value}>
                  {value} - {label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {entryType === "Hospital" && (
          <div>
            <InputLabel shrink htmlFor="dischargeDate">
              Discharge Date
            </InputLabel>
            <TextField
              type="date"
              id="dischargeDate"
              fullWidth
              required
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <InputLabel shrink htmlFor="dischargeCriteria">
              Discharge Criteria
            </InputLabel>
            <TextField
              id="dischargeCriteria"
              fullWidth
              required
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        )}
        {entryType === "OccupationalHealthcare" && (
          <div>
            <InputLabel shrink htmlFor="employerName">
              Employer Name
            </InputLabel>
            <TextField
              id="employerName"
              fullWidth
              required
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel shrink htmlFor="startDate">
              Sick Leave Start Date
            </InputLabel>
            <TextField
              type="date"
              id="startDate"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <InputLabel shrink htmlFor="endDate">
              Sick Leave End Date
            </InputLabel>
            <TextField
              type="date"
              id="endDate"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </div>
        )}
        <InputLabel id="diagnoses" htmlFor="diagnoses">
          Diagnoses
        </InputLabel>
        <Select
          labelId="diagnoses"
          fullWidth
          value={diagnosisCodes}
          multiple
          onChange={({ target }) =>
            setDiagnosisCodes(typeof target.value === "string" ? target.value.split(",") : target.value)
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((code) => (
                <Chip
                  key={code}
                  label={code}
                  size="small"
                  sx={{
                    backgroundColor: "#eeeeee",
                    borderRadius: "16px",
                    padding: "2px",
                  }}
                />
              ))}
            </Box>
          )}>
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button color="secondary" variant="contained" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
