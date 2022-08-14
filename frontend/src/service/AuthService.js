import axios from "axios";
import { SIGNIN, SIGNUP } from "../constants/ApiLinks";
import TokenService from "./TokenService";

class AuthService {
  async signup(values) {
    try {
      const res = await axios.post(SIGNUP, values);

      TokenService.setUser(res.data);

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

  async signin(values) {
    try {
      const res = await axios.post(SIGNIN, values);

      TokenService.setUser(res.data);

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

  signout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
