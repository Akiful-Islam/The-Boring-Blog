import {
  Avatar,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";
import { AuthContext } from "../../context/AuthContext";
import UserService from "../../service/UserService";
import generateProfileImage from "../../utils/generateProfileImage";
import ChangePassword from "../dialog_items/ChangePassword";
import EditProfile from "../dialog_items/EditProfile";

const ProfileCard = ({ data, onProfileUpdate }) => {
  const [openProfileEditor, setOpenProfileEditor] = useState(false);
  const [openPasswordEditor, setOpenPasswordEditor] = useState(false);

  const authContext = useContext(AuthContext);

  const alertContext = useContext(AlertContext);

  const closeProfileEditor = () => {
    setOpenProfileEditor(false);
  };

  const submitProfileEdit = async (values) => {
    const result = await UserService.updateProfile(values);
    if (result.success) {
      onProfileUpdate(result.data);
      alertContext.alertMode.toggleAlert("success", "Profile Updated.");
    } else {
      alertContext.alertMode.toggleAlert("error", result.error);
    }
    setOpenProfileEditor(false);
  };

  const closePasswordEditor = () => {
    setOpenPasswordEditor(false);
  };

  const submitPasswordEdit = async (values) => {
    const result = await UserService.updatePassword(values);
    if (result.success) {
      alertContext.alertMode.toggleAlert(
        "success",
        "Password Changed Successfully."
      );
    } else {
      alertContext.alertMode.toggleAlert("error", result.error);
    }
    setOpenPasswordEditor(false);
  };

  return (
    <Paper
      sx={{ maxWidth: 500, width: "100%", bgcolor: "#FFF6F2" }}
      variant="outlined"
      square
    >
      <Stack alignItems={"center"} spacing={2} py={3}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={generateProfileImage(data.username)}
          alt={data.username}
        />

        <Typography variant="h6">{data.username}</Typography>

        <Divider sx={{ width: 1 }} />

        <Typography sx={{ alignSelf: "start", px: 3 }} variant="subtitle">
          Email: {data.email}
        </Typography>

        <Typography sx={{ alignSelf: "start", px: 3 }} variant="body2">
          Date of Birth: {moment(data.dateOfBirth).format("MMMM Do, YYYY")}
        </Typography>

        <Typography sx={{ alignSelf: "start", px: 3 }} variant="body2">
          Gender: {data.gender}
        </Typography>

        {data.userId === authContext.authInfo.userId && (
          <Stack spacing={3} direction={"row"}>
            <Button onClick={() => setOpenProfileEditor(true)}>
              Edit Profile
            </Button>
            <EditProfile
              openDialog={openProfileEditor}
              handleClose={closeProfileEditor}
              handleSubmit={submitProfileEdit}
              defaultValues={data}
            />
            <Button onClick={() => setOpenPasswordEditor(true)}>
              Change Password
            </Button>
            <ChangePassword
              openDialog={openPasswordEditor}
              handleClose={closePasswordEditor}
              handleSubmit={submitPasswordEdit}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default ProfileCard;
