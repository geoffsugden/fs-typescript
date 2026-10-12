import { Gender, type NewPatientEntry } from './types.ts';

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return (Object.values(Gender) as string[]).includes(gender);
};

const isSSN = (ssn: string): boolean => {
  const dobAndIdent = [...ssn.slice(0, 6), ...ssn.slice(7, -1)];

  if (!dobAndIdent.map(Number).every((x) => Number.isFinite(x))) {
    throw new Error('Invalid or missing ssn');
  }

  // Below commented code written as exercise. Want to keep but course provided SSN's don't adhere to Finnish validation.
  // Therefore code commented out and may be reintroduced later if not using course provided data.
  // const checkDigitString = '0123456789ABCDEFHJKLMNPRSTUVWXY';
  // const checkDigitNum = dobAndIdent.map(Number).reduce((sum, curNum) => sum + curNum, 0) % 31;

  // const checkChar = checkDigitString.charAt(checkDigitNum);
  // if (checkChar !== ssn.at(-1)) {

  //   throw new Error('Inavlid check digit in ssn');
  // }
  return true;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDOB = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing date: ' + dob);
  }
  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseNewPatientEntry = (entry: unknown): NewPatientEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry) {
    const newPatient = {
      name: parseName(entry.name),
      dateOfBirth: parseDOB(entry.dateOfBirth),
      gender: parseGender(entry.gender),
      occupation: parseName(entry.occupation),
      ssn: parseSSN(entry.ssn),
    };

    return newPatient;
  }
  throw new Error('Incorrect data: one or more fields missing');
};

export default parseNewPatientEntry;
