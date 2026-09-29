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

interface TraingInputs {
  target: number;
  dailyHours: number[];
}

const parseArguments = (args: string[]): TraingInputs => {
  if (args.length < 4) throw new Error('Not enough argumnets');
  const dailyHours = args.slice(3);
  const dailyHoursCheck = dailyHours.filter((daily) => isNaN(Number(daily))).length === 0 && dailyHours.length > 0;
  if (!isNaN(Number(args[2])) && dailyHoursCheck) {
    return {
      target: Number(args[2]),
      dailyHours: dailyHours.map((daily) => Number(daily)),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateExercies = (trainingdata: TraingInputs): TrainingOutput => {
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
  const trainingData: TraingInputs = parseArguments(process.argv);
  console.log(calculateExercies(trainingData));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
