import { TextField, IconButton } from "@mui/material";
import React, { FC, useState } from "react";
import { InputAdornment, TextFieldProps } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<IProps> = React.forwardRef(
  ({ name, ...otherProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...otherProps}
            {...field}
            error={!!errors[name]}
            helperText={
              (errors[name] ? errors[name]?.message : "") as React.ReactNode
            }
            variant="outlined"
            name={name}
            margin="dense"
            sx={{ width: "100%" }}
            type={
              name.toLowerCase().includes("password")
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            ref={ref}
            InputProps={{
              endAdornment: name.toLowerCase().includes("password") ? (
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
        )}
      />
    );
  }
);
FormInput.displayName = "FormInput";
export default FormInput;
