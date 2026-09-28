const calculateBmi = (height: number, weight: number): string => {
  /**
   * Given a weight and height calculates the BMI range that an individual falles into
   */

  const bmi = weight / (height / 100) ** 2;
  return `${bmiRange(bmi)} range`;
};

const bmiRange = (bmi: number): string => {
  switch (true) {
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25.0:
      return 'Normal';
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

console.log(calculateBmi(180, 74));
