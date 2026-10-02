import calculateBmi from './bmiCalculator.ts';
import express from 'express';
const app = express();
app.use(express.json());

const validateInput = (value: unknown): number | undefined => {
  /**
   * Validates an input as being a finite number
   * @param value - The value to be validated
   * @returns The value as a number if valid, undefined if not.
   */
  if (!(typeof value === 'string')) return undefined;
  if (value.trim() === '') return undefined;
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = validateInput(req.query.weight);
  const height = validateInput(req.query.height);

  if (weight === undefined || height === undefined) {
    res.status(400).json({ error: 'malformed parameters' });
  }
  try {
    const bmiRange = calculateBmi({ weight: Number(weight), height: Number(height) });
    res.send({ weight: weight, height: height, bmi: bmiRange });
  } catch (error) {
    let errorMessage = 'Unable to calculate BMI: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
