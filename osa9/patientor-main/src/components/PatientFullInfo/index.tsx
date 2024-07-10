import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender, Diagnosis } from "../../types-full";
//import HealthRatingBar from "../HealthRatingBar";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnosis";
import Entries from "./Entries";

const PatientFullInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Array<Diagnosis>>();
  const [isPatientUpdated, setIsPatientUpdated] = useState(false);
  //const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    if (isPatientUpdated) {
      void fetchPatient();
      setIsPatientUpdated(false);
    }

    const fetchDiagnosis = async () => {
      const diagnosis = await diagnoseService.getAll();
      setDiagnosis(diagnosis);
    };
    void fetchPatient();
    void fetchDiagnosis();
  }, [id, isPatientUpdated]);

  if (!patient || !diagnosis) {
    return;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Entries
        patientId={patient.id}
        entries={patient.entries}
        diagnosis={diagnosis}
        setIsPatientUpdated={setIsPatientUpdated}
      />
    </div>
  );
};

export default PatientFullInfo;
