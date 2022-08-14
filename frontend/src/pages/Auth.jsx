import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignIn from "../components/auth_items/SignIn";
import SignUp from "../components/auth_items/SignUp";
import GlassCard from "../components/card_items/GlassCard";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../service/AuthService";

const BoxStyle = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Auth = () => {
  const authContext = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const navigate = useNavigate();

  const handleSignup = async (values) => {
    const result = await AuthService.signup(values);

    if (result.success) {
      authContext.setAuthInfo(result.data);
      navigate("/");
    } else {
      console.log(result.error);
    }
  };

  const handleSignin = async (values) => {
    const result = await AuthService.signin(values);

    if (result.success) {
      authContext.setAuthInfo(result.data);
      navigate("/");
    } else {
      console.log(result.error);
    }
  };
  return (
    <BoxStyle>
      <GlassCard sx={{ maxWidth: "500px", width: "100%" }} variant="outlined">
        {page === "signup" ? (
          <SignUp handleSubmit={handleSignup} />
        ) : (
          <SignIn handleSubmit={handleSignin} />
        )}
      </GlassCard>
    </BoxStyle>
  );
};

export default Auth;
