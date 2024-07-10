// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export interface IBmiResult {
  weight: number;
  height: number;
  bmi: string;
}

export interface IExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface IError {
  error: string;
}

export default "this is the default...";
