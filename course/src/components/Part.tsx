import { type JSX } from 'react';
import { type CoursePart } from '../types';

interface PartProp {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const partDetails = (part: CoursePart): JSX.Element => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <em>{part.description}</em>
        </div>
      );
    case 'group':
      return <div>project exercises {part.groupProjectCount}</div>;
    case 'background':
      return (
        <div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>{part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(', ')}</div>
        </div>
      );

    default:
      return assertNever(part);
  }
};

const Part = ({ part }: PartProp) => {
  return (
    <div>
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>

        {partDetails(part)}
        <p></p>
      </div>
    </div>
  );
};
export default Part;
