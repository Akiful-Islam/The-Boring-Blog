import { Button, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import GeneralField from "../input_fields/GeneralField";
import PasswordField from "../input_fields/PasswordField";

const SignIn = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Stack padding={5} spacing={3}>
      <Typography variant="h4">Sign In</Typography>

      <GeneralField label="Email" value={email} onChange={handleEmailChange} />

      <PasswordField
        label="Password"
        password={password}
        onChange={handlePasswordChange}
      />

      <Button
        variant="contained"
        disabled={!email || !password}
        onClick={() => handleSubmit({ email, password })}
      >
        Login
      </Button>
      <Typography variant="body1">
        Don't have an Account?{" "}
        <Link component={RouterLink} underline="hover" to="/auth?page=signup">
          Sign Up
        </Link>
      </Typography>
    </Stack>
  );
};

export default SignIn;
