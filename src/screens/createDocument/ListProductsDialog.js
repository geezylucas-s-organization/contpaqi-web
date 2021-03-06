import React from "react";
import { Grid, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { TableGeneral } from "../../components";
import { financial } from "../../utils";

const columns = [
  { id: "codigo", label: "Código" },
  { id: "nombre", label: "Nombre" },
];

const ListProductsDialog = ({
  handleClose,
  open,
  productsServices,
  movement,
  setMovement,
}) => {
  const clickRow = (row) => {
    setMovement({
      ...movement,
      codigo: row.codigo,
      nombre: row.nombre,
      precios: row.precios === null ? [] : row.precios,
      precio: row.precios === null ? financial(0.0) : "",
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        Lista de productos o servicios
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <TableGeneral
              rows={productsServices}
              columns={columns}
              clickRow={clickRow}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListProductsDialog;
