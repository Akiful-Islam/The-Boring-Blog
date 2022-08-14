import { createContext, useState } from "react";
import TokenService from "../service/TokenService";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useState(TokenService.getUser());
  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
