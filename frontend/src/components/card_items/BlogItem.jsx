import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";
import GlassCard from "./GlassCard";
import moment from "moment";
import generateProfileImage from "../../utils/generateProfileImage";
import BlogMenu from "../BlogMenu";
import WriteBlog from "../dialog_items/WriteBlog";
import BlogService from "../../service/BlogService";
import { BlogListContext } from "../../context/BlogListContext";
import { UserBlogListContext } from "../../context/UserBlogListContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BlogItem = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const blogListContext = useContext(BlogListContext);
  const userBlogListContext = useContext(UserBlogListContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onEdit = () => {
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };
  const handleEditSubmit = async (values) => {
    const result = await BlogService.editBlog({ ...data, ...values });
    if (result.success) {
      blogListContext.setBlogList(
        blogListContext.blogList.map((blog) =>
          blog.blogId === result.data.blogId ? result.data : blog
        )
      );
      userBlogListContext.setBlogList(
        userBlogListContext.blogList.map((blog) =>
          blog.blogId === result.data.blogId ? result.data : blog
        )
      );
      setOpenEditDialog(false);
    }
  };

  const onDelete = async () => {
    const result = await BlogService.deleteBlog(data.blogId);
    if (result.success) {
      blogListContext.setBlogList(
        blogListContext.blogList.filter((blog) => blog.blogId !== data.blogId)
      );
      userBlogListContext.setBlogList(
        userBlogListContext.blogList.filter(
          (blog) => blog.blogId !== data.blogId
        )
      );
      setOpenEditDialog(false);
    }
  };

  return (
    <>
      <GlassCard sx={{ maxWidth: 500, width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              alt={data.username}
              src={generateProfileImage(data.username)}
            />
          }
          action={
            <BlogMenu
              userId={data.userId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          }
          title={data.username}
          subheader={moment(data.dateCreated).format("MMMM Do, YYYY")}
        />

        <CardContent sx={{ py: "0" }}>
          <Typography variant="h6">{data.title}</Typography>
        </CardContent>

        <CardActions
          sx={{ cursor: "pointer" }}
          disableSpacing
          onClick={handleExpandClick}
        >
          <Typography variant="body2">
            {expanded ? "Hide Content" : "View Content"}
          </Typography>
          <ExpandMore expand={expanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{data.content}</Typography>
          </CardContent>
        </Collapse>
      </GlassCard>
      <WriteBlog
        openDialog={openEditDialog}
        handleClose={handleEditClose}
        handleSubmit={handleEditSubmit}
        defaultValues={data}
        editMode={true}
      />
    </>
  );
};

export default BlogItem;
