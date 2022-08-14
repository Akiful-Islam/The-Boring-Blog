import { Fab } from "@mui/material";
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import WriteBlog from "../components/dialog_items/WriteBlog";
import BlogService from "../service/BlogService";
import { BlogListContext } from "../context/BlogListContext";
import { UserBlogListContext } from "../context/UserBlogListContext";
import { AlertContext } from "../context/AlertContext";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const blogListContext = useContext(BlogListContext);

  const userBlogListContext = useContext(UserBlogListContext);

  const alertContext = useContext(AlertContext);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleSubmit = async (values) => {
    const result = await BlogService.writeBlog(values);

    if (result.success) {
      blogListContext.setBlogList([result.data, ...blogListContext.blogList]);

      alertContext.alertMode.toggleAlert(
        "success",
        "Blog Posted Successfully."
      );

      if (userBlogListContext.userId === result.data.userId) {
        userBlogListContext.setBlogList([
          result.data,
          ...userBlogListContext.blogList,
        ]);
      }
    } else {
      alertContext.alertMode.toggleAlert("error", result.error);
    }
    handleDialogClose();
  };
  return (
    <>
      <Navbar />
      <Fab
        onClick={handleDialogOpen}
        sx={{ mb: 4, mr: 5, position: "fixed", bottom: 0, right: 0 }}
        color="primary"
        variant="extended"
      >
        <BorderColorTwoToneIcon sx={{ mr: 1 }} />
        Create A Blog
      </Fab>
      <WriteBlog
        openDialog={openDialog}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
      <Outlet />
    </>
  );
};

export default Home;
