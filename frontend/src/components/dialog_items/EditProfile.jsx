import { Divider, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { useEffect, useState } from "react";
import DateField from "../input_fields/DateField";
import GenderField from "../input_fields/GenderField";
import GeneralField from "../input_fields/GeneralField";
import PasswordField from "../input_fields/PasswordField";

export default function EditProfile({
  openDialog,
  handleClose,
  handleSubmit,
  defaultValues,
}) {
  const [username, setUsername] = useState(defaultValues.username || "");
  const [email, setEmail] = useState(defaultValues.email || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    defaultValues.dateOfBirth || null
  );
  const [gender, setGender] = useState(defaultValues.gender || "");
  const [password, setPassword] = useState("");

  const handleNewName = (e) => {
    setUsername(e.target.value);
  };
  const handleNewEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleNewDateOfBirth = (newValue) => {
    setDateOfBirth(newValue);
  };

  const handleNewGender = (e) => {
    setGender(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setPassword(e.target.value);
  };

  const resetDefaultValues = () => {
    setUsername(defaultValues.username || "");
    setEmail(defaultValues.email || "");
    setDateOfBirth(defaultValues.dateOfBirth || null);
    setGender(defaultValues.gender || "");
    setPassword("");
  };

  useEffect(() => {
    resetDefaultValues();
  }, [openDialog]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openDialog}
      onClose={handleClose}
      scroll={"paper"}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <GeneralField
            label="Username"
            value={username}
            onChange={handleNewName}
          />
          <GeneralField label="Email" value={email} onChange={handleNewEmail} />
          <DateField
            label="Date of Birth"
            date={dateOfBirth}
            onChange={handleNewDateOfBirth}
          />
          <GenderField
            label="Select Gender"
            gender={gender}
            onChange={handleNewGender}
          />

          <Divider sx={{ width: 1 }} />

          <PasswordField
            label="Insert Password"
            password={password}
            onChange={handleConfirmPassword}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={!username || !email || !dateOfBirth || !gender || !password}
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
