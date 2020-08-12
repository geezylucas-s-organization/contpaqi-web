import React, { useState } from "react";
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
  const [openDialog, setOpenDialog] = useState(false);

  const [header, setHeader] = useState({
    date: new Date().toUTCString(),
    folio: 0,
    client: "",
    currency: 1,
    exchangeRate: "1.0000",
  });

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
            id="fecha"
            name="fecha"
            label="Fecha"
            fullWidth
            value={header.date}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="folio"
            name="folio"
            label="Folio"
            fullWidth
            value={header.folio}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cliente"
            name="cliente"
            label="Cliente"
            fullWidth
            value={header.client}
            InputProps={{ endAdornment: <SearchClient /> }}
            helperText="Por favor busque y seleccione un elemento"
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
            value={header.currency}
            onChange={(event) =>
              setHeader({ ...header, currency: event.target.value })
            }
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
            value={header.exchangeRate}
            onChange={(event) =>
              setHeader({ ...header, exchangeRate: event.target.value })
            }
          />
        </Grid>
      </Grid>
      <ListClientsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        setHeader={setHeader}
        header={header}
      />
    </React.Fragment>
  );
};

export default EncabezadoForm;
