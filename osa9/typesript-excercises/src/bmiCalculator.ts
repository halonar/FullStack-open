import { isNotNumber } from "./utils";

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

export const getBmiValue = (args: Array<string>): string => {
  if (args.length < 2 || args.length > 2) {
    console.error("Invalid number of arguments");
    process.exit();
  }

  if (isNotNumber(args[0] || isNotNumber(args[1]))) {
    console.error("Input arguments must be numbers");
    process.exit();
  }

  const height: number = +args[0];
  const weight: number = +args[1];

  //console.log(calculateBmi(height, weight));
  //console.log(calculateBmi(180, 74));

  return calculateBmi(height, weight);
};

console.log(process.argv.slice(2));
const args = process.argv.slice(2);
console.log(getBmiValue(args));
