import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const PhoneNumberInput = ({ value, onChange, ...rest }) => {
  const inputRef = useRef(null);
  const { required, fontSize, textAlign, ...styles } = rest;

  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [value]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InputMask mask="+\98 999 999 9999" value={value} onChange={onChange}>
        {() => (
          <TextField
            inputRef={inputRef}
            label="شماره تلفن همراه"
            variant="outlined"
            dir="ltr"
            required={required}
            sx={{
              ...styles,
            }}
            inputProps={{
              style: {
                fontSize: fontSize || 16,
                textAlign: textAlign || "center",
              },
            }}
            fullWidth
          />
        )}
      </InputMask>
    </div>
  );
};

export default PhoneNumberInput;
