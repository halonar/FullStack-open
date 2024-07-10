// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface IDiagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface IPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatientType = Omit<IPatient, "id">;

export type NonSensitivePatientType = Omit<IPatient, "ssn" | "entries">;
