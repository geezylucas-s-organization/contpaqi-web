import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ListClientsDialog from "./ListClientsDialog";
import { Title } from "../../components";

const EncabezadoForm = ({
  header,
  setHeader,
  concepts,
  clientsVendors,
  currencies,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleConcepts = (event) => {
    const concept = concepts.find(
      (e) => e.codigoConcepto === event.target.value
    );

    setHeader({
      ...header,
      nomConcept: concept.nombreConcepto,
      concept: concept.codigoConcepto,
      folio: concept.noFolio,
    });
  };

  const SearchClient = () => (
    <Tooltip title="Buscar cliente">
      <IconButton onClick={() => setOpenDialog(true)} size="small">
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Title>Encabezado</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="concepto"
            name="concepto"
            label="Concepto"
            fullWidth
            value={header.concept}
            helperText="Por favor selecciona un elemento"
            onChange={(event) => handleConcepts(event)}
          >
            {concepts.map((option) => (
              <MenuItem
                key={option.codigoConcepto}
                value={option.codigoConcepto}
              >
                {option.nombreConcepto}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="folio"
            name="folio"
            label="Folio"
            disabled
            fullWidth
            value={header.folio}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fecha"
            name="fecha"
            label="Fecha"
            type="date"
            fullWidth
            defaultValue={header.date}
            onChange={(event) =>
              setHeader({ ...header, date: event.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cliente"
            name="cliente"
            label="Cliente"
            fullWidth
            value={
              header.client.code !== ""
                ? `${header.client.code} ${header.client.businessName}`
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchClient />
                </InputAdornment>
              ),
            }}
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
            value={header.client.currency}
            onChange={(event) => {
              const currency = currencies.find(
                (o) => o.value === event.target.value
              );
              setHeader({
                ...header,
                client: {
                  currency: currency.value,
                  nomCurrency: currency.label,
                },
              });
            }}
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
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
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
        currencies={currencies}
        clientsVendors={clientsVendors}
      />
    </React.Fragment>
  );
};

export default EncabezadoForm;
