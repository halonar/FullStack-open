import { IBmiResult } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const heightMetres = height / 100;
  const bmi = weight / (heightMetres * heightMetres);
  console.log("BMI = ", bmi);

  if (bmi < 25) {
    return "Normal(healty weight)";
  }
  if (bmi >= 25 || bmi <= 29) {
    return "Overweight(Moderately obese)";
  } else {
    return "Obese(Severely obese)";
  }
};

export const getBmiValue = (height: number, weight: number): IBmiResult => {
  if (height === undefined || weight === undefined) {
    throw new Error("Height and weight must be provided");
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    throw new Error("Height and weight must be numbers");
  }

  if (heightNumber <= 0 || weightNumber <= 0) {
    throw new Error("Height and weight must be positive");
  }

  const bmi: string = calculateBmi(heightNumber, weightNumber);
  const bmiResult = { height, weight, bmi };

  return bmiResult;
};
