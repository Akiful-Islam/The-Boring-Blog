import React from "react";
import { Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import { BlogListContextProvider } from "./context/BlogListContext";
import { UserBlogListContextProvider } from "./context/UserBlogListContext";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function App() {
  return (
    <BlogListContextProvider>
      <UserBlogListContextProvider>
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
      </UserBlogListContextProvider>
    </BlogListContextProvider>
  );
}

export default App;
