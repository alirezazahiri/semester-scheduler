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
  width: string | number;
}

function SelectContainer({ items, name, value, handleChange, width }: IProps) {
  return (
    <FormControl variant="standard" sx={{ m: 1, width, flex: "1 1 0" }}>
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
        MenuProps={{
          MenuListProps: {
            sx: {
              bgcolor: "background.paper",
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.name}
            value={item.value}
            sx={{ color: "primary.main" }}
            dir="rtl"
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectContainer;
