import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const PhoneNumberInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

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
            label="شماره تلفن"
            variant="outlined"
            dir="ltr"
            inputProps={{ style: { fontSize: 24, textAlign: "center" } }}
          />
        )}
      </InputMask>
    </div>
  );
};

export default PhoneNumberInput;
