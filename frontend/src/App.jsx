import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AlertSnackbar from "./components/AlertSnackbar";
import Protected from "./components/Protected";
import { AlertContext } from "./context/AlertContext";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function App() {
  const alertContext = useContext(AlertContext);
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        >
          <Route index element={<Feed />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
      <AlertSnackbar
        open={alertContext.alert}
        severity={alertContext.alertMessage.type}
        message={alertContext.alertMessage.text}
      />
    </>
  );
}

export default App;
