import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

const columns = [
  { id: "nombreConcepto", label: "Concepto" },
  { id: "folio", label: "Folio", minWidth: 100, align: "right" },
  { id: "serie", label: "Serie", minWidth: 50 },
  { id: "razonSocialCliente", label: "Razón social" },
  { id: "total", label: "Total", align: "right" },
  { id: "pendiente", label: "Pendiente", align: "right" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Documents = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [action, setAction] = useState("last");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const dataAsync = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5007/api/Documento/GetDocumentos?action=${action}&numberOfDocs=${rowsPerPage}`
        );
        setRows(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    dataAsync();
  }, [action, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    if (newPage === 0) {
      setAction("last");
    } else if (newPage > page) {
      setAction("prev");
    } else if (newPage < page) {
      setAction("next");
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setAction("last");
    setPage(0);
  };

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
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => {
                      return (
                        <TableRow hover tabIndex={-1} key={i}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Documents;
