import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import GeneralField from "../input_fields/GeneralField";

export default function WriteBlog({
  openDialog,
  handleClose,
  handleSubmit,
  defaultValues,
  editMode = false,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const resetDefaultValues = () => {
    if (editMode) {
      setTitle(defaultValues.title);
      setContent(defaultValues.content);
    } else {
      setTitle("");
      setContent("");
    }
  };

  useEffect(() => {
    resetDefaultValues();
  }, [openDialog]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openDialog}
      onClose={handleClose}
      scroll={"paper"}
    >
      <DialogTitle>{editMode ? "Edit Blog" : "Create A Blog"}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <GeneralField
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Write Blog"
            multiline
            minRows={10}
            value={content}
            onChange={handleContentChange}
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={!content || !title}
          onClick={() => handleSubmit({ title, content })}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
