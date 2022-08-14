import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import generateProfileImage from "../../utils/generateProfileImage";
import GlassCard from "./GlassCard";
const UserItem = ({ data }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile/" + data.userId);
  };

  return (
    <GlassCard>
      <Stack alignItems={"center"} spacing={2} padding={3}>
        <Avatar
          alt={data.username}
          src={generateProfileImage(data.username)}
          sx={{ width: 80, height: 80 }}
        />

        <Typography variant="h6">{data.username}</Typography>

        <Typography variant="body1">{data.email}</Typography>

        <Button variant="outlined" onClick={handleProfileClick}>
          View Profile
        </Button>
      </Stack>
    </GlassCard>
  );
};

export default UserItem;
