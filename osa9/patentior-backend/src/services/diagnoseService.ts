import diagnoseData from "../../data/diagnosis";
import { Diagnosis } from "../types-full";

const diagnosis: Array<Diagnosis> = diagnoseData;
//const diagnoses: Array<IDiagnose> = diagnoseData as Array<IDiagnose>;

const getDiagnosis = (): Array<Diagnosis> => {
  return diagnosis;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnosis,
  addDiagnose,
};
