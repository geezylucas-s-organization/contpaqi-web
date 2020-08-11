import React from "react";
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
import { ListProductsDialog } from ".";

const AddMovimientoDialog = ({ open, handleClose }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

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
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Agregar movimiento</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Ingrese todos los datos:</DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="producto"
                name="producto"
                label="Producto"
                fullWidth
                value="PROD1 - alimento para mascotas"
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
                value={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="precio"
                name="precio"
                label="Precio"
                fullWidth
                value="200.0"
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
                value="230.0"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
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
