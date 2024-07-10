import express from "express";
import { getBmiValue } from "./src/webBmiCalculator";
import { IBmiResult, IExerciseResult, IError } from "./src/utils";
import { getExerciseResults } from "./src/webExerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  try {
    const bmi: IBmiResult = getBmiValue(Number(height), Number(weight));
    console.log("BMI: ", bmi);
    res.send(bmi);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    console.log("BMI error: ", error.message);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const err: IError = { error: error.message };
    res.status(400).send(err);
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    console.log("EXERCISES: ", daily_exercises, ":", target);

    const exerciseResults: IExerciseResult = getExerciseResults(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      daily_exercises,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      target
    );

    res.json(exerciseResults);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    console.log("Exercise error: ", error.message);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const err: IError = { error: error.message };
    res.status(400).send(err);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
