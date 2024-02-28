import {registrars} from "@decentraweb/core";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";

const durationOptions = [
  {value: registrars.DURATION.ONE_YEAR, label: '1 year'},
  {value: registrars.DURATION.TWO_YEARS, label: '2 years'},
  {value: registrars.DURATION.THREE_YEARS, label: '3 years'},
  {value: registrars.DURATION.FOUR_YEARS, label: '4 years'},
  {value: registrars.DURATION.FIVE_YEARS, label: '5 years'},
];

interface Props {
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}

function DurationSelect({name, value, onChange}: Props): JSX.Element {
  const handleChange = React.useCallback((event: SelectChangeEvent<number>) => {
    onChange(name, event.target.value as number);
  }, [name, onChange]);
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="duration-select">Registration Duration</InputLabel>
      <Select
        labelId="duration-select"
        id="duration-select"
        defaultValue={registrars.DURATION.ONE_YEAR}
        value={value}
        label="Registration Duration"
        onChange={handleChange}
      >
        {durationOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DurationSelect;
