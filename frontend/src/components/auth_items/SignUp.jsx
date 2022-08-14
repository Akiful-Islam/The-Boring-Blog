import { Button, Link, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import DateField from "../input_fields/DateField";
import GenderField from "../input_fields/GenderField";
import GeneralField from "../input_fields/GeneralField";
import PasswordField from "../input_fields/PasswordField";
const SignUp = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChage = (newValue) => {
    setDateOfBirth(newValue);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Stack padding={5} spacing={3}>
      <Typography variant="h4">Create Account</Typography>

      <GeneralField
        label="Username"
        value={username}
        onChange={handleNameChange}
      />

      <GeneralField label="Email" value={email} onChange={handleEmailChange} />

      <DateField
        label="Date of Birth"
        date={dateOfBirth}
        onChange={handleDateChage}
      />

      <GenderField
        label="Gender"
        gender={gender}
        onChange={handleGenderChange}
      />

      <PasswordField
        label="Password"
        password={password}
        onChange={handlePasswordChange}
      />
      <PasswordField
        label="Confirm Password"
        password={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <Button
        variant="contained"
        disabled={
          !username ||
          !email ||
          !dateOfBirth ||
          !gender ||
          !password ||
          !confirmPassword
        }
        onClick={() =>
          handleSubmit({
            username,
            email,
            dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
            gender,
            password,
          })
        }
      >
        Sign Up
      </Button>
      <Typography variant="body1">
        Already have an Account?{" "}
        <Link component={RouterLink} underline="hover" to="/auth?page=signin">
          Sign In
        </Link>
      </Typography>
    </Stack>
  );
};

export default SignUp;
