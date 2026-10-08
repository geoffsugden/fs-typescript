import calculateBmi from './bmiCalculator.ts';
import { type TrainingInputs, calculateExercises } from './exerciseCalculator.ts';
import express from 'express';
const app = express();
app.use(express.json());

const parseNumber = (value: unknown): number | undefined => {
  /**
   * Parses a string to a finite number.
   * @param value - The value to be validated
   * @returns The value as a number if valid, undefined if not.
   */
  if (!(typeof value === 'string')) return undefined;
  if (value.trim() === '') return undefined;
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
};

const parseTrainingInputs = (
  value: unknown,
): { result: true; trainingInputs: TrainingInputs } | { result: false; error: string } => {
  /**
   * Parses an input and ensures it meets the Training Inputs Interface. A JSON Object with:
   * 1. A number array named daily_exercises.
   * 2. A finite number.
   * @param value - The input to be validated
   * @return The valid training input.
   */

  // Check if value is the right kind of object
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { result: false, error: 'parameters missing' };
  }

  // Check that our keys exist
  if (!('target' in value) || !('daily_exercises' in value)) {
    return { result: false, error: 'parameters missing' };
  }

  // Now we know our keys exist we can extract them into consts, to make our life a little easier.
  const target = value.target;
  const daily_exercises = value.daily_exercises;

  // Check that dailyExercises is an array that consists only of numbers.
  // This will also let through an array of length 0, but this is not our job to check that here.
  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((item: unknown): item is number => typeof item === 'number' && Number.isFinite(item))
  ) {
    return { result: false, error: 'malformatted parameters' };
  }

  // Check that the target is a valid, finite number.
  if (typeof target !== 'number' || !Number.isFinite(target)) {
    return { result: false, error: 'malformatted parameters' };
  }

  return { result: true, trainingInputs: { target, daily_exercises } };
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = parseNumber(req.query.weight);
  const height = parseNumber(req.query.height);

  if (weight === undefined || height === undefined) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  try {
    const bmiRange = calculateBmi({ weight: weight, height: height });
    res.send({ weight: weight, height: height, bmi: bmiRange });
  } catch (error) {
    let errorMessage = 'Unable to calculate BMI: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  const trainingInputs = parseTrainingInputs(req.body);

  if (!trainingInputs.result) {
    res.status(400).json({ error: trainingInputs.error });
    return;
  }

  try {
    const trainingData = calculateExercises(trainingInputs.trainingInputs);
    res.json(trainingData);
  } catch (error) {
    let errorMessage = 'Unable to provide training data: ';
    if (error instanceof RangeError) {
      errorMessage += error.message;
      res.status(422).json({ error: errorMessage });
      return;
    } else if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log('An unknown error has occurred', errorMessage);

    res.status(500).json({ error: 'Unable to provide training data evaluation due to unknown error.' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
