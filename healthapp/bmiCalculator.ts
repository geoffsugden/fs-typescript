import { MAX_HEIGHT, MAX_WEIGHT } from './constants.ts';

interface BmiInputs {
  height: number;
  weight: number;
}

type BmiRange = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';

const validateBmiValue = (value: number, inputType: 'weight' | 'height'): boolean => {
  return value > 0 && value <= (inputType === 'weight' ? MAX_WEIGHT : MAX_HEIGHT);
};

const bmiRange = (bmi: number): BmiRange => {
  switch (true) {
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25.0:
      return 'Normal range';
    case bmi < 30.0:
      return 'Overweight';
    case bmi >= 30:
      return 'Obese';
    default:
      throw new Error('BMI Range unable to be calculated.');
  }
};

const calculateBmi = (bmiInputs: BmiInputs): BmiRange => {
  /**
   * Given a weight and height calculates the BMI range that an individual falls into
   * @param bmiInputs - The weight and height used to calculate bmi.
   * @returns The BMI range corresponding to the provided height and weight.
   */
  const { weight, height } = bmiInputs;

  if (!validateBmiValue(weight, 'weight') || !validateBmiValue(height, 'height')) {
    throw new Error('Cannot calculate BMI with provided values.');
  }
  const bmi = weight / (height / 100) ** 2;
  return bmiRange(bmi);
};

const parseArguments = (args: string[]): BmiInputs => {
  if (args.length < 4) throw new Error('Not enough argumnets');
  if (args.length > 4) throw new Error('Too many argumnets');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const bmiInputValues = parseArguments(process.argv);
    console.log(calculateBmi(bmiInputValues));
  } catch (error: unknown) {
    let errorMessage = 'Something has gone wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
