import { createContext, useState } from "react";

const BlogListContext = createContext(null);

function BlogListContextProvider({ children }) {
  const [blogList, setBlogList] = useState([]);
  return (
    <BlogListContext.Provider value={{ blogList, setBlogList }}>
      {children}
    </BlogListContext.Provider>
  );
}

export { BlogListContext, BlogListContextProvider };
