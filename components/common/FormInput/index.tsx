import { TextField } from "@mui/material";
import React, { FC, useState } from "react";

interface IProps {
  name: string;
  label: string;
  description?: string;
  error?: boolean;
  required?: boolean;
}

const FormInput: FC<IProps> = ({
  name,
  label,
  description,
  error,
  required,
}) => {
  const [value, setValue] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      margin="dense"
      sx={{ width: "100%" }}
      value={value}
      onChange={changeHandler}
      error={error}
      helperText={description}
      required={required}
    />
  );
};

export default FormInput;
