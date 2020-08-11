import React from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ListClientsDialog } from ".";

const currencies = [
  {
    value: 1,
    label: "Peso Mexicano",
  },
  {
    value: 2,
    label: "Dólar Mexicano",
  },
];

const EncabezadoForm = () => {
  const [currency, setCurrency] = React.useState(1);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const SearchClient = () => (
    <Tooltip title="Buscar cliente">
      <IconButton onClick={() => setOpenDialog(true)}>
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Encabezado
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fecha"
            name="fecha"
            label="Fecha"
            fullWidth
            disabled
            value={new Date().toUTCString()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="folio"
            name="folio"
            label="Folio"
            fullWidth
            disabled
            value={38}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cliente"
            name="cliente"
            label="Cliente"
            fullWidth
            value="PROV1 - prosis copilco sa de cv"
            InputProps={{ endAdornment: <SearchClient /> }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="moneda"
            name="moneda"
            label="Moneda"
            fullWidth
            value={currency}
            onChange={handleChange}
            helperText="Por favor selecciona un elemento"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="tipoDeCambio"
            name="tipoDeCambio"
            label="Tipo de cambio"
            fullWidth
            value="1.0000"
          />
        </Grid>
      </Grid>
      <ListClientsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </React.Fragment>
  );
};

export default EncabezadoForm;
