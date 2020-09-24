import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(4),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const typeClient = [
  {
    value: 1,
    label: "Cliente",
  },
  {
    value: 2,
    label: "Cliente - proveedor",
  },
  {
    value: 3,
    label: "Proveedor",
  },
];

const CreateClient = ({ currencies }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    codeClient: "",
    businessName: "",
    dateNow: moment(Date.now()).format("YYYY-MM-DD"),
    rfc: "",
    curp: "",
    currency: "",
    typeClient: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5007/api/Cliente/",
        {
          cCodigoCliente: form.codeClient,
          cRazonSocial: form.businessName,
          cFechaAlta: moment(form.dateNow).format("MM/DD/YYYY"),
          cRFC: form.rfc,
          cCURP: form.curp,
          cNombreMoneda: form.currency,
          cTipoCliente: form.type,
          cEstatus: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        setOpen(true);
        setForm({
          codeClient: "",
          businessName: "",
          dateNow: moment(Date.now()).format("YYYY-MM-DD"),
          rfc: "",
          curp: "",
          nameCurrency: "",
          currency: "",
          typeClient: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Nuevo cliente
          </Typography>
          <Typography variant="h6" gutterBottom>
            Datos generales
          </Typography>
          {loading ? (
            <Grid container justify="center">
              <CircularProgress size={50} />
            </Grid>
          ) : (
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dateNow"
                    name="dateNow"
                    label="Fecha"
                    type="date"
                    fullWidth
                    disabled
                    defaultValue={form.dateNow}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="codeClient"
                    name="codeClient"
                    label="Código cliente"
                    required
                    fullWidth
                    helperText="Debe ser únicio"
                    value={form.codeClient}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="businessName"
                    name="businessName"
                    label="Razón social"
                    required
                    fullWidth
                    value={form.businessName}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="rfc"
                    name="rfc"
                    label="RFC"
                    fullWidth
                    value={form.rfc}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="curp"
                    name="curp"
                    label="CURP"
                    fullWidth
                    value={form.curp}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    select
                    id="currency"
                    name="currency"
                    label="Moneda"
                    fullWidth
                    helperText="Por favor selecciona un elemento"
                    value={form.currency}
                    onChange={handleInputs}
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
                    required
                    select
                    id="typeClient"
                    name="typeClient"
                    label="Tipo cliente"
                    fullWidth
                    helperText="Por favor selecciona un elemento"
                    value={form.typeClient}
                    onChange={handleInputs}
                  >
                    {typeClient.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Crear
                </Button>
              </div>
            </form>
          )}
        </Paper>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se agregó correctamente el cliente al catálogo de clientes y
            proveedores.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.document.extra.currencies,
});

export default connect(mapStateToProps, {})(CreateClient);
