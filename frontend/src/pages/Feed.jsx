import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import BlogItem from "../components/card_items/BlogItem";
import { BlogListContext } from "../context/BlogListContext";
import BlogService from "../service/BlogService";

const Feed = () => {
  const blogListContext = useContext(BlogListContext);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const result = await BlogService.getAllBlog();
    if (result.success) {
      blogListContext.setBlogList(result.data);
    }
  };

  return (
    <Stack alignItems="center" spacing={1} padding={2}>
      {blogListContext.blogList.map((data) => (
        <BlogItem key={data.blogId} data={data} />
      ))}
    </Stack>
  );
};

export default Feed;
