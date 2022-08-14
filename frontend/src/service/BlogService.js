import TokenService from "./TokenService";
import axios from "axios";
import {
  DELETE_BLOG,
  EDIT_BLOG,
  GET_ALL_BLOGS,
  GET_BLOGS_BY_USERID,
  WRITE_BLOG,
} from "../constants/ApiLinks";

class BlogService {
  async getAllBlog() {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.get(GET_ALL_BLOGS, config);

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      };
    }
  }
  async getBlogsByUserId(userId) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.get(GET_BLOGS_BY_USERID + userId, config);

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      };
    }
  }
  async writeBlog(values) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.post(WRITE_BLOG, values, config);

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      };
    }
  }
  async editBlog(values) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.patch(EDIT_BLOG, values, config);

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      };
    }
  }
  async deleteBlog(blogId) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.delete(DELETE_BLOG + blogId, config);

      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      };
    }
  }
}

export default new BlogService();
