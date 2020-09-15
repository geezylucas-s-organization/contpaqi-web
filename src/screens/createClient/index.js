import React from "react";
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="fecha"
                name="fecha"
                label="Fecha"
                type="date"
                fullWidth
                disabled
                defaultValue={moment(Date.now()).format("YYYY-MM-DD")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="codigocliente"
                name="codigocliente"
                label="Código cliente"
                required
                fullWidth
                helperText="Debe ser únicio"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="razonsocial"
                name="razonsocial"
                label="Razón social"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="rfc" name="rfc" label="RFC" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="curp" name="curp" label="CURP" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                select
                id="moneda"
                name="moneda"
                label="Moneda"
                fullWidth
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
                required
                select
                id="tipocliente"
                name="tipocliente"
                label="Tipo cliente"
                fullWidth
                helperText="Por favor selecciona un elemento"
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
            >
              Crear
            </Button>
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.document.extra.currencies,
});

export default connect(mapStateToProps, {})(CreateClient);
