import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { Diagnosis, EntryFormValues, EntryType } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: Diagnosis[];
  entryType: EntryType;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses, entryType }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose}>
    <DialogTitle>New HealthCheckEntry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && (
        <Alert sx={{ "& .MuiAlert-message": { whiteSpace: "pre-line" } }} severity="error">
          {error}
        </Alert>
      )}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} entryType={entryType} />
    </DialogContent>
  </Dialog>
);
export default AddEntryModal;
