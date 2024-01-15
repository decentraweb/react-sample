import React, {useCallback} from "react";
import {InputAdornment, TextField} from "@mui/material";

interface Props {
  domain: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string | null;
}

function SubdomainInput({domain, name, value, onChange, error}: Props): JSX.Element {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  }, [name, onChange]);
  return (
    <TextField
      required
      fullWidth
      margin="normal"
      id="subdomain-input"
      type="text"
      label="Subdomain"
      placeholder="my-awesome-domain"
      name={name}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: <InputAdornment position="start">.{domain}</InputAdornment>
      }}
    />
  )
}

export default SubdomainInput;
