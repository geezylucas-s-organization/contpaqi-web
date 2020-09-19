import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { v4 as uuidv4 } from "uuid";
import ListProductsDialog from "./ListProductsDialog";
import { financial } from "../../utils";

const AddMovimientoDialog = ({
  open,
  handleClose,
  setRows,
  productsServices,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [movement, setMovement] = useState({
    uuid: uuidv4(),
    codigo: "",
    nombre: "",
    cantidad: financial(0.0),
    unidad: "(N)",
    precio: financial(0.0),
    precios: [],
    subtotal: financial(0.0),
    total: financial(0.0),
    iva: financial(0.0),
  });

  useEffect(() => {
    setMovement({
      uuid: uuidv4(),
      codigo: "",
      nombre: "",
      cantidad: financial(0.0),
      unidad: "(N)",
      precio: financial(0.0),
      precios: [],
      subtotal: financial(0.0),
      total: financial(0.0),
      iva: financial(0.0),
    });
  }, [open]);

  const handlePrecio = (event) => {
    setMovement({
      ...movement,
      precio: event.target.value,
      subtotal: financial(event.target.value * movement.cantidad),
      iva: financial(event.target.value * movement.cantidad * 0.16),
      total: financial(event.target.value * movement.cantidad * 1.16),
    });
  };

  const SearchProduct = () => (
    <Tooltip title="Buscar producto o servicio">
      <IconButton onClick={() => setOpenDialog(true)} size="small">
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
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Agregar movimiento</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="producto"
                name="producto"
                label="Producto"
                fullWidth
                value={
                  movement.codigo !== ""
                    ? `${movement.codigo} ${movement.nombre}`
                    : ""
                }
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
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={(event) =>
                  setMovement({
                    ...movement,
                    cantidad: event.target.value,
                    subtotal: financial(event.target.value * movement.precio),
                    iva: financial(event.target.value * movement.precio * 0.16),
                    total: financial(
                      event.target.value * movement.precio * 1.16
                    ),
                  })
                }
                value={movement.cantidad}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {movement.precios.length > 0 ? (
                <TextField
                  required
                  select
                  id="precio"
                  name="precio"
                  label="Precio"
                  fullWidth
                  value={movement.precio}
                  helperText="Por favor selecciona un elemento"
                  onChange={(event) => handlePrecio(event)}
                >
                  {movement.precios.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  required
                  id="precio"
                  name="precio"
                  label="Precio"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={movement.precio}
                  onChange={(event) => handlePrecio(event)}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="descuento"
                name="descuento"
                label="Descuento"
                fullWidth
                value="0.00"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="iva"
                name="iva"
                label="I.V.A."
                fullWidth
                value={movement.iva}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="subtotal"
                name="subtotal"
                label="Subtotal"
                fullWidth
                value={movement.subtotal}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="total"
                name="total"
                label="Total"
                fullWidth
                value={movement.total}
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
        productsServices={productsServices}
        movement={movement}
        setMovement={setMovement}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </React.Fragment>
  );
};

export default AddMovimientoDialog;
