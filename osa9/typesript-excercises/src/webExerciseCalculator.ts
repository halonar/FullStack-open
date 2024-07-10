import { isNotNumber, IExerciseResult } from "./utils";

enum Ratings {
  Bad = 1,
  Alright,
  Good,
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): IExerciseResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exerciseResults = <IExerciseResult>{};

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  exerciseResults.periodLength = exerciseHours.length;

  const initialValue = 0;
  const trainingHours = exerciseHours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const trainingDays = exerciseHours.filter((hours) => hours > 0);

  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  exerciseResults.trainingDays = trainingDays.length;
  exerciseResults.average = trainingHours / exerciseResults.periodLength;
  exerciseResults.target = target;
  exerciseResults.success = exerciseResults.rating >= target ? true : false;

  if (exerciseResults.average < target * 0.75) {
    exerciseResults.rating = Ratings.Bad;
    exerciseResults.ratingDescription = "too bad and should be better";
  } else if (exerciseResults.average < target) {
    exerciseResults.rating = Ratings.Alright;
    exerciseResults.ratingDescription = "not too bad but could be better";
  } else {
    exerciseResults.rating = Ratings.Good;
    exerciseResults.ratingDescription = "excellent!";
  }
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  return exerciseResults;
};

export const getExerciseResults = (
  exerciseDays: Array<number>,
  target: number
): IExerciseResult => {
  if (exerciseDays.length < 1 || !target) {
    throw new Error("parameters missing");
  }

  exerciseDays.forEach((hours) => {
    if (isNotNumber(hours)) {
      console.error("Input argument " + hours + " must be a number");
      throw new Error("Input argument " + hours + " must be a number");
    }
  });

  if (isNotNumber(target)) {
    console.error("Input argument " + target + " must be a number");
    throw new Error("Input argument " + target + " must be a number");
  }

  const newExerciseDays: Array<number> = exerciseDays.map(Number);

  console.log("newExerciseDays: ", newExerciseDays);
  console.log(calculateExercises(newExerciseDays, target));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exerciseResults = calculateExercises(newExerciseDays, target);

  return exerciseResults;
};
