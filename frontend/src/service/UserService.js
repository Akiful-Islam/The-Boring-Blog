import axios from "axios";
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
  VIEW_USER_PROFILE,
  GET_ALL_USERS,
} from "../constants/ApiLinks";
import TokenService from "./TokenService";

class UserService {
  async viewProfile(userId) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.get(VIEW_USER_PROFILE + userId, config);

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

  async getAllUsers() {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.get(GET_ALL_USERS, config);

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

  async updateProfile(values) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.patch(UPDATE_USER_PROFILE, values, config);

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
  async updatePassword(values) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + TokenService.getToken(),
        },
      };
      const res = await axios.put(UPDATE_USER_PASSWORD, values, config);

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

export default new UserService();
