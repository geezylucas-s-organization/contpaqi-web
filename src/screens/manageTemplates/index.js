import React, { useState, useEffect } from "react";
import axios from "axios";
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
  { id: "ClienteProveedor", label: "Cliente" },
  { id: "Descripcion", label: "Descripcion" },
  { id: "ProximaFactura", label: "Proxima factura" },
  { id: "UltimaVezFacturada", label: "Ultima vez facturado" },
  { id: "Estatus", label: "Estatus" },
];

const ManageTemplates = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const dataAsync = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5007/api/Plantillas/?Page=${page}&Size=${rowsPerPage}`
        );

        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    dataAsync();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Administrar plantillas para facturación automática
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
              {rows.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.Documentoid}>
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

export default ManageTemplates;
