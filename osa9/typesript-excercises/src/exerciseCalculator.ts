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
  const exerciseResults = <IExerciseResult>{};

  exerciseResults.periodLength = exerciseHours.length;

  const initialValue = 0;
  const trainingHours = exerciseHours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const trainingDays = exerciseHours.filter((hours) => hours > 0);
  exerciseResults.trainingDays = trainingDays.length;
  exerciseResults.average = trainingHours / exerciseResults.periodLength;
  exerciseResults.target = target;

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

  exerciseResults.success = exerciseResults.rating >= target ? true : false;

  return exerciseResults;
};

if (process.argv.length < 8) {
  console.error("Invalid number of arguments");
  process.exit();
}

console.log(process.argv.slice(2));
const args = process.argv.slice(2);

args.forEach((hours) => {
  if (isNotNumber(hours)) {
    console.error("Input argument " + hours + " must be a number");
    process.exit();
  }
});

const target: number = +args[0];
const exerciseDays = process.argv.slice(3);
//console.log("exerciseDays: ", exerciseDays);

const newExerciseDays: Array<number> = exerciseDays.map(Number);

console.log("newExerciseDays: ", newExerciseDays);
console.log(calculateExercises(newExerciseDays, target));

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
