import { TextField } from "@mui/material";
import React from "react";

const GeneralField = ({ label, value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
    />
  );
};

export default GeneralField;
