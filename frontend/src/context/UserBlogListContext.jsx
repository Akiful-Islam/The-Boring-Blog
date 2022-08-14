import { createContext, useState } from "react";

const UserBlogListContext = createContext(null);

function UserBlogListContextProvider({ children }) {
  const [blogList, setBlogList] = useState([]);
  const [userId, setUserId] = useState(null);
  return (
    <UserBlogListContext.Provider
      value={{ blogList, setBlogList, userId, setUserId }}
    >
      {children}
    </UserBlogListContext.Provider>
  );
}

export { UserBlogListContext, UserBlogListContextProvider };
