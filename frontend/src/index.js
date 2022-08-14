import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AlertContextProvider } from "./context/AlertContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BlogListContextProvider } from "./context/BlogListContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserBlogListContextProvider } from "./context/UserBlogListContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <AuthContextProvider>
        <BlogListContextProvider>
          <UserBlogListContextProvider>
            <AlertContextProvider>
              <App />
            </AlertContextProvider>
          </UserBlogListContextProvider>
        </BlogListContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);
