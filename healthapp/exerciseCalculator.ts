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

interface TrainingInputs {
  target: number;
  dailyHours: number[];
}

const parseArguments = (args: string[]): TrainingInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHours = args.slice(3).map((d) => Number(d));
  if (!isNaN(Number(args[2])) && dailyHours.every((d) => !Number.isNaN(d))) {
    return {
      target: Number(args[2]),
      dailyHours: dailyHours,
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateExercises = (trainingdata: TrainingInputs): TrainingOutput => {
  const target = trainingdata.target;
  const dailyHours = trainingdata.dailyHours;

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
