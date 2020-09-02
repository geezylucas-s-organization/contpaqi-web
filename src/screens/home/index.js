import React from "react";
import { Container, Box, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inicio
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
