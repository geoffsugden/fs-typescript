import Part from './Part';
import type { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <div key={coursePart.name}>
          <Part part={coursePart} />
        </div>
      ))}
    </div>
  );
};
export default Content;
