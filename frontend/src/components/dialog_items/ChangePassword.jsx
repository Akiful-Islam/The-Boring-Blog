import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import PasswordField from "../input_fields/PasswordField";

export default function ChangePassword({
  openDialog,
  handleClose,
  handleSubmit,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const resetDefaultValues = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
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
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <PasswordField
            label="Current Password"
            password={oldPassword}
            onChange={handleOldPassword}
          />
          <PasswordField
            label="New Password"
            password={newPassword}
            onChange={handleNewPassword}
          />
          <PasswordField
            label="Confirm Password"
            password={confirmNewPassword}
            onChange={handleConfirmNewPassword}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={!oldPassword || !newPassword || !confirmNewPassword}
          onClick={() =>
            handleSubmit({ oldPassword, newPassword, confirmNewPassword })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
