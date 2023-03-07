import { TextField, IconButton } from "@mui/material";
import React, { FC, useState } from "react";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IProps {
  name: string;
  label: string;
  description?: string;
  error?: boolean;
  required?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  textAlign?: "left" | "right" | "center";
}

const FormInput: FC<IProps> = ({
  name,
  label,
  description,
  error,
  required,
  value,
  onChange,
  textAlign,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      dir={textAlign === "left" ? "ltr" : "rtl"}
      variant="outlined"
      label={label}
      name={name}
      margin="dense"
      sx={{ width: "100%", textAlign: textAlign || "right" }}
      value={value}
      onChange={onChange}
      error={error}
      helperText={description}
      required={required}
      type={
        name.includes("password")
          ? showPassword
            ? "text"
            : "password"
          : "text"
      }
      InputProps={{
        endAdornment: name.includes("password") ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : (
          <></>
        ),
      }}
    />
  );
};

export default FormInput;
