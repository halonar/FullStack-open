import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import diagnoseData from "../../data/diagnosis";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface DiagnosisCodes {
  diagnoseCode: string[];
  setDiagnoseCode: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DiagnosisCodesSelect: React.FC<DiagnosisCodes> = ({
  diagnoseCode,
  setDiagnoseCode,
}) => {
  const theme = useTheme();
  //const [diagnoseCode, setDiagnoseCode] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnoseCode>) => {
    const {
      target: { value },
    } = event;
    setDiagnoseCode(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="multiple-code-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="multiple-code-label"
          id="multiple-codes"
          multiple
          value={diagnoseCode}
          required
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          MenuProps={MenuProps}
        >
          {diagnoseData.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
              style={getStyles(diagnosis.code, diagnoseCode, theme)}
            >
              {diagnosis.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
