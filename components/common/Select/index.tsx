import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface IProps {
  items: {
    name: string;
    value: string | number;
  }[];
  name: string;
  value: string | number;
  handleChange: (e: SelectChangeEvent) => void;
}

function SelectContainer({ items, name, value, handleChange }: IProps) {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 140, maxWidth: 140 }}>
      <InputLabel id="select-standard-label">{name}</InputLabel>
      <Select
        labelId="select-standard-label"
        id="select-standard"
        value={value.toString()}
        onChange={handleChange}
        label={name}
        sx={{
          textAlign: "right",
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.name} value={item.value} dir="rtl">
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectContainer;
