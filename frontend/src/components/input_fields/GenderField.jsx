import { MenuItem, TextField } from "@mui/material";
import React from "react";

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];

const GenderField = ({ label, gender, onChange }) => {
  return (
    <TextField select label={label} value={gender} onChange={onChange}>
      {genders.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GenderField;
