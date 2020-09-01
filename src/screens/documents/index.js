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
  CircularProgress,
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import PDFDialog from "./PDFDialog";

const columns = [
  { id: "fecha", label: "Fecha" },
  { id: "nombreConcepto", label: "Concepto" },
  { id: "folio", label: "Folio", minWidth: 30, align: "right" },
  { id: "serie", label: "Serie", minWidth: 30 },
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
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [action, setAction] = useState({ action: "last", refresh: true });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPDF, setOpenPDF] = useState({ open: false, id: 0 });

  useEffect(() => {
    const dataAsync = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5007/api/Documento/GetDocumentos?action=${action.action}&numberOfDocs=${rowsPerPage}`
        );
        setRows(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    dataAsync();
  }, [action, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    if (newPage === 0) {
      setAction({ action: "last", refresh: !action.refresh });
    } else if (newPage > page) {
      setAction({ action: "prev", refresh: !action.refresh });
    } else if (newPage < page) {
      setAction({ action: "next", refresh: !action.refresh });
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
            {loading ? (
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            ) : (
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
                        <TableCell>PDF</TableCell>
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
                            <TableCell
                              onClick={() =>
                                setOpenPDF({ open: true, id: row.folio })
                              }
                            >
                              <PictureAsPdfIcon />
                            </TableCell>
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
            )}
          </Grid>
        </Grid>
      </Box>
      <PDFDialog
        open={openPDF.open}
        handleClose={() => setOpenPDF({ ...openPDF, open: false })}
        id={openPDF.id}
      />
    </Container>
  );
};

export default Documents;
