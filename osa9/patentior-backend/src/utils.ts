import {
  Gender,
  NewPatientType,
  Entry,
  EntryWithoutId,
  Diagnosis,
  Discharge,
  SickLeave,
  HealthCheckRating,
  BaseEntry,
} from "./types-full";

const isNumber = (x: unknown): x is number => {
  return typeof x === "number" || x instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  // if (!isString(entries)) {
  //   throw new Error("Incorrect or missing ssn");
  // }

  return entries as Array<Entry>;
};

const toNewPatient = (object: unknown): NewPatientType => {
  console.log("ToNewPatient: ", object);
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatientType = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

//toNewEntry----------------------------------------------------------------------

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};
const parseDate = (date: unknown): string => {
  if (!isString(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  //console.log("object.diagnosisCodes", diagnosisCodes);

  if (!diagnosisCodes || typeof diagnosisCodes !== "object") {
    //we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;

    //throw new Error("Incorrect or missing diagnosisCodes");
  }

  //console.log("DiagnosisCodes", diagnosisCodes);
  return diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error("Incorrect or missing discharge");
  }

  if (!isString(discharge.date)) {
    throw new Error("Incorrect or missing discharge date");
  }

  if (!isString(discharge.criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }

  return discharge as Discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave) {
    return {} as SickLeave;
  } else if (
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect or missing sickLeave");
  }

  if (!isString(sickLeave.startDate)) {
    throw new Error("Incorrect or missing sickLeave startDate");
  }

  if (!isString(sickLeave.endDate)) {
    throw new Error("Incorrect or missing sickLeave endDate");
  }

  return sickLeave as SickLeave;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  //console.log("HealthCheckRating: ", healthCheckRating);

  if (!isNumber(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return healthCheckRating as unknown as HealthCheckRating;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  //console.log("ToNewEntry: ", object);
  const newObject = object as { [index: string]: unknown }; // Type assertion here

  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  const baseEntry: Omit<BaseEntry, "id"> = {
    description: parseDescription(newObject.description),
    date: parseDate(newObject.date),
    specialist: parseSpecialist(newObject.specialist),
    diagnosisCodes: parseDiagnosisCodes(newObject.diagnosisCodes),
  };

  switch (object.type) {
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(newObject.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(newObject.employerName),
        sickLeave: parseSickLeave(newObject.sickLeave),
      };
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(newObject.healthCheckRating),
      };
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(newObject)}`
      );
  }
};

export { toNewPatient, toNewEntry };
