import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddPatientEntryForm from "./AddPatientEntryForm";
import { EntryWithoutId } from "../../types-full";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddPatientEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmitEntry={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;
