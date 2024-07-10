import { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Entry, Diagnosis, EntryWithoutId } from "../../types-full";
import AddPatientEntryModal from "../AddPatientEntryModal";
import { Button } from "@mui/material";
import axios from "axios";
import patientService from "../../services/patients";
import ShowEntry from "./ShowEntry";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: "left",
  //color: theme.palette.text.secondary,
}));

interface EntryProps {
  patientId: string;
  entries: Array<Entry>;
  diagnosis: Array<Diagnosis>;
  setIsPatientUpdated: (value: boolean) => void;
}

const Entries = ({
  patientId,
  entries,
  diagnosis,
  setIsPatientUpdated,
}: EntryProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: EntryWithoutId) => {
    try {
      const patientEntry = await patientService.createEntry(patientId, values);
      console.log("submitNewPatientEntry", patientEntry);
      setModalOpen(false);
      setIsPatientUpdated(true);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h3>entries</h3>
      <Box sx={{ flexGrow: 1 }}>
        {Object.values(entries).map((entry: Entry) => (
          <div key={entry.id}>
            <Grid container spacing={1}>
              <Grid item={true} xs={8}>
                <Item>
                  <ShowEntry entry={entry} diagnosis={diagnosis} />
                </Item>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient Entry
      </Button>
    </div>
  );
};

export default Entries;
