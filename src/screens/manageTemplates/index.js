import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
  IconButton,
  Tooltip,
  Button,
  Grid,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import DialogConfig from "./DialogConfig";

const columns = [
  { id: "ClienteProveedor", label: "Cliente" },
  { id: "Descripcion", label: "Descripcion" },
  { id: "ProximaFactura", label: "Proxima factura" },
  { id: "UltimaVezFacturada", label: "Ultima vez facturado" },
];

const ManageTemplates = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [config, setConfig] = useState({ open: false, idDocument: 0 });

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

  const editIcon = (
    <Tooltip title="Editar configuración">
      <IconButton>
        <EditIcon color="primary" />
      </IconButton>
    </Tooltip>
  );

  const settingsIcon = (id) => (
    <Tooltip title="Terminar de configurar">
      <IconButton
        onClick={() => {
          setConfig({ open: true, idDocument: id });
        }}
      >
        <SettingsIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
      >
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Administrar plantillas para facturación automática
          </Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            component={Link}
            to="/createdocument"
            variant="contained"
            color="primary"
          >
            Crear plantilla
          </Button>
        </Grid>
      </Grid>
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
                <TableCell>Acciones</TableCell>
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
                          {value}
                        </TableCell>
                      );
                    })}
                    {row.Estatus ? (
                      <TableCell>{editIcon}</TableCell>
                    ) : (
                      <TableCell>{settingsIcon(row.Documentoid)}</TableCell>
                    )}
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
      <DialogConfig
        open={config.open}
        handleClose={() => setConfig({ open: false, idDocument: 0 })}
        idDocument={config.idDocument}
      />
    </React.Fragment>
  );
};

export default ManageTemplates;
