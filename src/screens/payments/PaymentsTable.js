import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { Title } from "../../components";

const columns = [
  { id: "fecha", label: "Fecha" },
  { id: "nombreConcepto", label: "Concepto" },
  { id: "folio", label: "Folio", minWidth: 30, align: "right" },
  { id: "serie", label: "Serie", minWidth: 30 },
  { id: "razonSocialCliente", label: "Razón social" },
  { id: "total", label: "Total", align: "right" },
  { id: "pendiente", label: "Pendiente", align: "right" },
];

const PaymentsTable = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [action, setAction] = useState({ action: "last", refresh: true });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

    //dataAsync();
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
    <React.Fragment>
      <Title>Lista de pagos</Title>
      {!loading ? (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PaymentsTable;
