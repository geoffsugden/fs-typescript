interface bmiInputs {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): bmiInputs => {
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

const bmiRange = (bmi: number): string => {
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
      throw new Error(
        "BMI outside of known ranges, seek medical attention immeadiately (or check your inputs cause it's probaly just them being wrong)",
      );
  }
};

const calculateBmi = (bmiInputs: bmiInputs): string => {
  /**
   * Given a weight and height calculates the BMI range that an individual falles into
   */

  const bmi = bmiInputs.weight / (bmiInputs.height / 100) ** 2;
  return bmiRange(bmi);
};

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
