import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BlogMenu({ userId, onEdit, onDelete }) {
  const authContext = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    handleClose();
    onEdit();
  };

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    userId === authContext.authInfo.userId && (
      <>
        <IconButton
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>Edit Blog</MenuItem>
          <MenuItem onClick={handleDelete}>Delete Blog</MenuItem>
        </Menu>
      </>
    )
  );
}
