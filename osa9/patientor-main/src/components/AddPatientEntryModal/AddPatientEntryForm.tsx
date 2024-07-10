import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Grid, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { EntryWithoutId, HealthCheckRating } from "../../types-full";
import { DiagnosisCodesSelect } from "./DiagnosisCodesSelect";
import DatePickerValue from "./DatePickerValue";

interface Props {
  onCancel: () => void;
  onSubmitEntry: (values: EntryWithoutId) => void;
}

const healthCheckRatingOptions = Object.entries(HealthCheckRating)
  .filter(([key]) => isNaN(Number(key)))
  .map(([key, value]) => ({ key, value: Number(value) }));

//console.log(healthCheckRatingOptions);

const AddPatientEntryForm = ({ onCancel, onSubmitEntry }: Props) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string>(currentDate);
  const [specialist, setSpecialist] = useState("");
  const [diagnoseCode, setDiagnoseCode] = useState<string[]>([]);
  const [entry, setEntry] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>(currentDate);
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] =
    useState<string>(currentDate);
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>(currentDate);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  //const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const type = event.target.value as string;
    setEntry(type);
    // const type = event.target.value as
    //   | "Hospital"
    //   | "OccupationalHealthcare"
    //   | "HealthCheck";
    //setEntry({ ...entry, type }); // update the entry state with the selected type
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find((r) => r === value);
      if (rating) {
        setHealthCheckRating(rating);
      }
    }
  };

  const addPatientEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseFields = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnoseCode,
      type: entry,
    };

    let specificFields = {};

    switch (entry) {
      case "Hospital":
        specificFields = {
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        break;

      case "OccupationalHealthcare":
        specificFields = {
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        break;

      case "HealthCheck":
        specificFields = {
          healthCheckRating,
        };
        break;

      default:
        console.log("addPatientEntry: unknown entry: ", entry);
        return;
    }

    onSubmitEntry({ ...baseFields, ...specificFields } as EntryWithoutId);
  };

  //Conditional fields based on entry type
  const getEntryTypeFields = (type: string) => {
    switch (type) {
      case "Hospital":
        return (
          <>
            <DatePickerValue
              label={"Discharge Date"}
              setDateString={setDischargeDate}
            />
            <TextField
              sx={{ marginTop: 2 }}
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              required
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              sx={{ marginTop: 2 }}
              label="Employer Name"
              fullWidth
              value={employerName}
              required
              onChange={({ target }) => setEmployerName(target.value)}
            />
            {/* Optional sick leave fields */}
            <DatePickerValue
              label={"Sick Leave Start Date"}
              setDateString={setSickLeaveStartDate}
            />
            <DatePickerValue
              label={"Sick Leave End Date"}
              setDateString={setSickLeaveEndDate}
            />
          </>
        );
      case "HealthCheck":
        return (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="health-check-rating-label">
              Health Check Rating
            </InputLabel>
            <Select
              sx={{ marginTop: 2 }}
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={addPatientEntry}>
        <FormControl fullWidth>
          <InputLabel id="entry-type-select-label">Entry type</InputLabel>
          <Select
            labelId="entry-type-select-label"
            label="Entry type"
            id="entry-type-select"
            fullWidth
            value={entry}
            required
            onChange={handleTypeChange}
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
          </Select>

          <TextField
            sx={{ marginTop: 2 }}
            label="Description"
            fullWidth
            value={description}
            required
            onChange={({ target }) => setDescription(target.value)}
          />
          <DatePickerValue label={"Date"} setDateString={setDate} />
          <TextField
            sx={{ marginTop: 2 }}
            label="Specialist"
            fullWidth
            value={specialist}
            required
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <DiagnosisCodesSelect
            diagnoseCode={diagnoseCode}
            setDiagnoseCode={setDiagnoseCode}
          />
          {getEntryTypeFields(entry)}
          <Grid>
            <Grid item>
              <Button
                sx={{ marginTop: 2 }}
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ marginTop: 2 }}
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;
