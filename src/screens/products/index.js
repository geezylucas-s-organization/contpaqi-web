import React, { useState } from "react";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";

const columns = [
  { id: "fecha", label: "Fecha" },
  { id: "nombreConcepto", label: "Concepto" },
  { id: "folio", label: "Folio", minWidth: 30, align: "right" },
  { id: "serie", label: "Serie", minWidth: 30 },
  { id: "razonSocialCliente", label: "Razón social" },
  { id: "total", label: "Total", align: "right" },
];

const Products = () => {
  const [rows, setRows] = useState([]);
  const [action, setAction] = useState({ action: "last", refresh: true });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <Typography variant="h4" component="h1" gutterBottom>
      Lista de productos, paquete y servicio
      <Paper>
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
    </Typography>
  );
};

export default Products;
