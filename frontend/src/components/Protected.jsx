import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Protected = ({ children }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authContext.authInfo?.token) {
      navigate("/Auth");
    }
  }, [authContext.authInfo, navigate]);

  return children;
};

export default Protected;
