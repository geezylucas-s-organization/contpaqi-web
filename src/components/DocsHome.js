import React, { useState, useEffect } from "react";
import { Link as LinkRoute } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Link,
  Grid,
} from "@material-ui/core";
import { Title } from ".";

const columns = [
  { id: "fecha", label: "Fecha" },
  { id: "nombreConcepto", label: "Concepto" },
  { id: "folio", label: "Folio", minWidth: 30, align: "right" },
  { id: "serie", label: "Serie", minWidth: 30 },
  { id: "razonSocialCliente", label: "Razón social" },
  { id: "total", label: "Total", align: "right" },
  { id: "pendiente", label: "Pendiente", align: "right" },
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function DocsHome() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataAsync = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5007/api/Documento/GetDocumentos?action=last&numberOfDocs=5`
        );
        setRows(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    dataAsync();
  }, []);

  return (
    <React.Fragment>
      <Title>Último documentos</Title>
      {loading ? (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" size="small">
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
      )}
      <div className={classes.seeMore}>
        <Link color="primary" component={LinkRoute} to="/documents">
          Ver más documentos
        </Link>
      </div>
    </React.Fragment>
  );
}
