import { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Part = ({ courseParts }: ContentProps): JSX.Element[] => {
  return courseParts.map((part) => {
    switch (part.kind) {
      case "basic":
        return (
          <div key={part.name}>
            <h3 key={part.name}>
              {part.name} {part.exerciseCount}
            </h3>
            <p>{part.description}</p>
          </div>
        );

      case "group":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        );

      case "background":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>{part.description}</p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        );

      case "special":
        return (
          <div key={part.name}>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>{part.description}</p>
            <p>
              required skills:{" "}
              {part.requirements.map(
                (skill, index) => (index ? ", " : "") + skill
              )}
            </p>
          </div>
        );

      default:
        return assertNever(part);
    }
  });
};

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <>
      <Part courseParts={courseParts} />
    </>
  );
};

export default Content;
