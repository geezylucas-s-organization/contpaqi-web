import React from "react";
import { Typography, Link, Box } from "@material-ui/core";

const Copyright = () => (
  <Box marginTop={4}>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        PROSIS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Box>
);

export default Copyright;
