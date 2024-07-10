import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { green, purple, red, yellow } from "@mui/material/colors";

import { Entry, Diagnosis, HealthCheckRating } from "../../types-full";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface ShowEntryProps {
  entry: Entry;
  diagnosis: Array<Diagnosis>;
}

const getDiagnoseDescription = (
  diagnosis: Array<Diagnosis>,
  code: Diagnosis["code"]
): string | undefined => {
  //console.log("diagnose", code);
  const diagnose: Diagnosis | undefined = diagnosis?.find(
    (diagnose) => !diagnose.code.localeCompare(code)
  );

  return diagnose ? diagnose.name : undefined;
};

interface ShowHealthCheckRatingProps {
  rating: HealthCheckRating;
}

const ShowHealthCheckRating = ({
  rating,
}: ShowHealthCheckRatingProps): JSX.Element => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: green[500] }} />;

    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: yellow[500] }} />;

    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: purple[500] }} />;

    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon sx={{ color: red[500] }} />;

    default:
      return assertNever(rating);
  }
};

const ShowEntry = ({ entry, diagnosis }: ShowEntryProps): JSX.Element => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>
            {entry.date} <MedicalInformationIcon />
          </p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          {entry.diagnosisCodes &&
            Object.values(entry.diagnosisCodes).map((dc: Diagnosis["code"]) => (
              <ul key={dc}>
                <li>
                  {dc} {getDiagnoseDescription(diagnosis, dc)}
                </li>
              </ul>
            ))}
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>
            {entry.date} <WorkIcon /> {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          {entry.diagnosisCodes &&
            Object.values(entry.diagnosisCodes).map((dc: Diagnosis["code"]) => (
              <ul key={dc}>
                <li>
                  {dc}
                  {getDiagnoseDescription(diagnosis, dc)}
                </li>
              </ul>
            ))}
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p>
            {entry.date} <MedicalServicesIcon />
          </p>
          <p>{entry.description}</p>
          <ShowHealthCheckRating rating={entry.healthCheckRating} />
          <p>diagnose by {entry.specialist}</p>
          {entry.diagnosisCodes &&
            Object.values(entry.diagnosisCodes).map((dc: Diagnosis["code"]) => (
              <ul key={dc}>
                <li>
                  {dc}
                  {getDiagnoseDescription(diagnosis, dc)}
                </li>
              </ul>
            ))}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default ShowEntry;
