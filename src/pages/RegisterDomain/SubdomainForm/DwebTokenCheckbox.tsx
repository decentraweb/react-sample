import {Checkbox, FormControlLabel} from "@mui/material";
import {useCallback} from "react";

interface Props {
  name: string;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
}

function DwebTokenCheckbox({name, value, onChange}: Props): JSX.Element {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.checked);
  }, [name, onChange]);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={handleChange}
          name={name}
          color="primary"
        />
      }
      label="Pay with Dweb token"
    />
  )
}

export default DwebTokenCheckbox;
