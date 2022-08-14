import { Paper } from "@mui/material";
import React from "react";

const GlassCard = (props) => {
  return (
    <Paper
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
      {...props}
    >
      {props.children}
    </Paper>
  );
};

export default GlassCard;
