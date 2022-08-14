import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import BlogItem from "../components/card_items/BlogItem";
import ProfileCard from "../components/card_items/ProfileCard";
import { UserBlogListContext } from "../context/UserBlogListContext";
import BlogService from "../service/BlogService";
import UserService from "../service/UserService";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const userBlogListContext = useContext(UserBlogListContext);

  useEffect(() => {
    getProfile();
    getUserBlogs();
  }, [userId]);

  const getProfile = async () => {
    const result = await UserService.viewProfile(userId);
    if (result.success) {
      setUserData(result.data);
      userBlogListContext.setUserId(result.data.userId);
    }
  };

  const getUserBlogs = async () => {
    const result = await BlogService.getBlogsByUserId(userId);
    if (result.success) {
      userBlogListContext.setBlogList(result.data);
    }
  };

  const onProfileUpdate = (updatedValues) => {
    setUserData(updatedValues);
  };

  return (
    <Stack spacing={3} padding={3} alignItems="center">
      {userData && (
        <ProfileCard data={userData} onProfileUpdate={onProfileUpdate} />
      )}
      {userBlogListContext.blogList.map((data) => (
        <BlogItem key={data.blogId} data={data} />
      ))}
    </Stack>
  );
};

export default Profile;
