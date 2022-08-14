import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserItem from "../components/card_items/UserItem";
import UserService from "../service/UserService";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await UserService.getAllUsers();
    if (result.success) {
      console.log(result.data);
      setUsers(result.data);
    }
  };
  return (
    <Stack alignItems="center" padding={3}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 4 }}>
        {users.map((user) => (
          <Grid key={user.userId} item xs={1}>
            <UserItem data={user} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Users;
