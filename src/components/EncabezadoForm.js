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

const EncabezadoForm = ({ header, setHeader }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const SearchClient = () => (
    <Tooltip title="Buscar cliente">
      <IconButton onClick={() => setOpenDialog(true)} size="small">
        <SearchIcon fontSize="small" />
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
            select
            id="concepto"
            name="concepto"
            label="Concepto"
            fullWidth
            value={header.concept}
            helperText="Por favor selecciona un elemento"
            onChange={(event) =>
              setHeader({ ...header, concept: event.target.value })
            }
          >
            {header.concepts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
            value={`${header.client.code} ${header.client.businessName}`}
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
            value={header.client.currency}
            onChange={(event) =>
              setHeader({ ...header, client: { currency: event.target.value } })
            }
            helperText="Por favor selecciona un elemento"
          >
            {header.currencies.map((option) => (
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