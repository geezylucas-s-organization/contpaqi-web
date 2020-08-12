import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { v4 as uuidv4 } from "uuid";
import { ListProductsDialog } from ".";

const AddMovimientoDialog = ({ open, handleClose, setRows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [movement, setMovement] = useState({});

  useEffect(() => {
    setMovement({
      uuid: uuidv4(),
      codigo: "PROD1",
      nombre: "alimento para mascotas",
      cantidad: 10.0,
      unidad: "(N)",
      precio: 200.0,
      total: 2320.0,
    });
  }, [open]);

  const SearchProduct = () => (
    <Tooltip title="Buscar producto o servicio">
      <IconButton onClick={() => setOpenDialog(true)}>
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Agregar movimiento</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Ingrese todos los datos:</DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="producto"
                name="producto"
                label="Producto"
                fullWidth
                value={movement.nombre}
                InputProps={{ endAdornment: <SearchProduct /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="almacen"
                name="almacen"
                label="Almacen"
                fullWidth
                value={1}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cantidad"
                name="cantidad"
                label="Cantidad"
                fullWidth
                onChange={(event) =>
                  setMovement({ ...movement, cantidad: event.target.value })
                }
                value={movement.cantidad}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="precio"
                name="precio"
                label="Precio"
                fullWidth
                value={movement.precio}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="descuento"
                name="descuento"
                label="Descuento"
                fullWidth
                value="0.0"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="iva"
                name="iva"
                label="I.V.A."
                fullWidth
                value="0.0"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClose();
              setRows((prevArray) => [...prevArray, movement]);
            }}
            color="primary"
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      <ListProductsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </React.Fragment>
  );
};

export default AddMovimientoDialog;
