import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface IProps {
  label: string;
  labelName: string;
  defaultValue: any;
  items: { name: string; value: string }[];
  rest?: any;
}

const FormSelect = React.forwardRef((props: IProps, ref) => {
  const {
    label,
    labelName,
    items,
    defaultValue,
    ...rest
  } = props
  return (
    <FormControl sx={{ my: 1, mb: 0.5 }}>
      <InputLabel
        htmlFor={`${labelName}-select`}
        id={`${labelName}-label`}
        required
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${labelName}-label`}
        id={`${labelName}-select`}
        label={label}
        defaultValue={defaultValue}
        sx={{
          textAlign: "right",
        }}
        dir="ltr"
        {...rest}
        ref={ref}
        required
      >
        {[...items].map((item) => (
          <MenuItem key={item.name} value={item.value} dir="rtl">
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
})

FormSelect.displayName = "FormSelect"

export default FormSelect;
