import { v1 as uuid } from "uuid";
import patientData from "../../data/patients-full";
import {
  Patient,
  NewPatientType,
  NonSensitivePatientType,
  EntryWithoutId,
  Entry,
} from "../types-full";

const patients: Array<Patient> = patientData;
//const patients: Array<IPatient> = patientData as Array<IPatient>;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientData = (): Array<NonSensitivePatientType> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  //console.log("PATIENT:", patient);
  return patient;
};

const addPatient = (patient: NewPatientType): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  //console.log("PATIENT:", newPatient);
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (
  patient: NewPatientType,
  entry: EntryWithoutId
): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries = patient.entries.concat(newEntry);
  //console.log("PATIENT-ENTRY:", newEntry, "+", patient);
  return newEntry;
};

export default {
  getPatients,
  findById,
  addPatient,
  addPatientEntry,
  getNonSensitivePatientData,
};
