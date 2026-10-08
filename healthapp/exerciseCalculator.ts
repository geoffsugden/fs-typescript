import getRatingDesc from './exerciseCalculatorRatingDescription.ts';

interface TrainingOutput {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface TrainingInputs {
  target: number;
  daily_exercises: number[];
}

const parseArguments = (args: string[]): TrainingInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHours = args.slice(3).map((d) => Number(d));
  if (!isNaN(Number(args[2])) && dailyHours.every((d) => !Number.isNaN(d))) {
    return {
      target: Number(args[2]),
      daily_exercises: dailyHours,
    };
  } else {
    throw new RangeError('Provided values were not numbers');
  }
};

export const calculateExercises = (trainingdata: TrainingInputs): TrainingOutput => {
  const target = trainingdata.target;
  const dailyHours = trainingdata.daily_exercises;

  if (dailyHours.length === 0 || target <= 0 || !dailyHours.every((hours) => hours >= 0)) {
    console.log('Length', dailyHours.length);
    console.log('Target', target);
    console.log('all ', dailyHours.length);

    throw new RangeError('Invalid values');
  }

  const periodLength = dailyHours.length;

  const average =
    dailyHours.reduce((sumHours, current) => {
      return sumHours + current;
    }, 0) / periodLength;

  const rating = Math.max(0, Math.min(2, Math.round(average / target))) + 1;

  return {
    periodLength: periodLength,
    trainingDays: dailyHours.filter((daily) => daily > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: getRatingDesc(rating),
    target: target,
    average: average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const trainingData: TrainingInputs = parseArguments(process.argv);
    console.log(calculateExercises(trainingData));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
