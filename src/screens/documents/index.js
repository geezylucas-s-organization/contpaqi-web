import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography, Box, Paper } from "@material-ui/core";
import Chart from "./Chart";
import DocsTable from "./DocsTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Documents = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Facturas
        </Typography>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Docs */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <DocsTable />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Documents;
