import express from "express";
import patientService from "../services/patientService";
import { NewPatientType, EntryWithoutId } from "../types-full";
import { toNewPatient, toNewEntry } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  //console.log(patientService.getPatients());
  //res.send(patientService.getPatients());
  res.send(patientService.getNonSensitivePatientData());
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post("/", (req, res) => {
  try {
    //console.log("POST-PATIENT: ", req.body);
    const newPatient = toNewPatient(req.body as NewPatientType);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    res.sendStatus(404);
    return;
  }

  try {
    //console.log("POST-ENTRY: ", patient, ":", req.body);
    const newEntry = toNewEntry(req.body as EntryWithoutId);
    const addedEntry = patientService.addPatientEntry(patient, newEntry);
    //console.log("ENTRY: ", addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
