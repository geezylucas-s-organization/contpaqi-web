import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { TableGeneral } from "../../components";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Documents = () => {
  const classes = useStyles();
  const [concept, setConcept] = useState(5);

  const concepts = [
    {
      value: 5,
      label: "Facturas al Contado",
    },
    {
      value: 6,
      label: "Facturas Crédito",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
              Lista de documentos
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<NoteAddIcon />}
              component={Link}
              to="/documents/create"
            >
              Crear documento
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Paper className={classes.root}>
              <TableGeneral rows={rows} columns={columns} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Documents;
