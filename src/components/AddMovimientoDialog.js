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
import { ListProductsDialog } from ".";

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
    cantidad: 0.0,
    unidad: "(N)",
    precio: "",
    total: 0.0,
    precios: [],
  });

  useEffect(() => {
    setMovement({
      uuid: uuidv4(),
      codigo: "",
      nombre: "",
      cantidad: 0.0,
      unidad: "(N)",
      precio: "",
      total: 0.0,
      precios: [],
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
                  onChange={(event) =>
                    setMovement({ ...movement, precio: event.target.value })
                  }
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
                  fullWidth
                  value={movement.precio}
                  onChange={(event) =>
                    setMovement({ ...movement, precio: event.target.value })
                  }
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
