import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  label: string;
  setDateString: (value: string) => void;
}

export default function DatePickerValue({ label, setDateString }: Props) {
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  //const [dateString, setDateString] = useState<string>("2022-04-17");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker", "DatePicker"]}
        sx={{ marginTop: 1 }}
      >
        <DatePicker
          sx={{ width: "100% " }}
          label={label}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            const newDateString = newValue?.format("YYYY-MM-DD");
            setDateString(newDateString || "");
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
