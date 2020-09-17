import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

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

const typeProduct = [
  {
    value: 1,
    label: "Producto",
  },
  {
    value: 2,
    label: "Paquete",
  },
  {
    value: 3,
    label: "Servicio",
  },
];

const AddPrice = () => (
  <Tooltip title="Buscar cliente">
    <IconButton type="submit">
      <AddIcon />
    </IconButton>
  </Tooltip>
);

const CreateProduct = () => {
  const classes = useStyles();
  const [price, setPrice] = useState(0);
  const [prices, setPrices] = useState([]);

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Nuevo producto
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
                id="codigoproducto"
                name="codigoproducto"
                label="Código producto"
                required
                fullWidth
                helperText="Debe ser únicio"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="nombreproducto"
                name="nombreproducto"
                label="Nombre producto"
                required
                fullWidth
              />
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
                {typeProduct.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="descripcion"
                label="Descriptión"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="clavesat"
                name="clavesat"
                label="Clave SAT"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Box marginTop={4}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={4}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPrices((state) => [...state, price]);
                    setPrice(0);
                  }}
                >
                  <TextField
                    id="precios"
                    name="precios"
                    label="Precios"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AddPrice />
                        </InputAdornment>
                      ),
                    }}
                    helperText="Por favor agregar un elemento"
                  />
                </form>
                <List>
                  {prices.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem key={value} role={undefined} dense button>
                        <ListItemText
                          id={labelId}
                          primary={`Precio: ${value}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => {
                              const newPrices = prices.filter(
                                (elem) => elem !== value
                              );
                              setPrices(newPrices);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
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

export default CreateProduct;
