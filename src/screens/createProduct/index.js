import React, { useState } from "react";
import axios from "axios";
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
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { financial } from "../../utils";

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
  const [form, setForm] = useState({
    codeProduct: "",
    nameProduct: "",
    description: "",
    typeProduct: "",
    claveSat: "",
    dateNow: moment(Date.now()).format("YYYY-MM-DD"),
    prices: [],
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

  const onSubmit = async () => {
    setLoading(true);

    const data = {
      cCodigoProducto: form.codeProduct,
      cNombreProducto: form.nameProduct,
      cDescripcionProducto: form.description,
      cTipoProducto: form.typeProduct,
      cFechaAltaProducto: form.dateNow,
      cStatusProducto: 1,
      cClaveSAT: form.claveSat,
    };

    form.prices.forEach((o, i) => {
      let key = `cPrecio${i + 1}`;
      data[key] = financial(o);
    });

    try {
      const response = await axios.post(
        "http://localhost:5007/api/Producto/",
        data,
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
          codeProduct: "",
          nameProduct: "",
          description: "",
          typeProduct: "",
          claveSat: "",
          dateNow: moment(Date.now()).format("YYYY-MM-DD"),
          prices: [],
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
            Nuevo producto
          </Typography>
          <Typography variant="h6" gutterBottom>
            Datos generales
          </Typography>
          {loading ? (
            <Grid container justify="center">
              <CircularProgress size={50} />
            </Grid>
          ) : (
            <React.Fragment>
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
                    id="codeProduct"
                    name="codeProduct"
                    label="Código producto"
                    required
                    fullWidth
                    helperText="Debe ser únicio"
                    value={form.codeProduct}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="nameProduct"
                    name="nameProduct"
                    label="Nombre producto"
                    required
                    fullWidth
                    value={form.nameProduct}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    select
                    id="typeProduct"
                    name="typeProduct"
                    label="Tipo producto"
                    fullWidth
                    helperText="Por favor selecciona un elemento"
                    value={form.typeProduct}
                    onChange={handleInputs}
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
                    id="description"
                    name="description"
                    label="Descriptión"
                    multiline
                    fullWidth
                    value={form.description}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="claveSat"
                    name="claveSat"
                    label="Clave SAT"
                    required
                    fullWidth
                    value={form.claveSat}
                    onChange={handleInputs}
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
                        setForm({ ...form, prices: [...form.prices, price] });
                        setPrice(0);
                      }}
                    >
                      <TextField
                        id="price"
                        name="price"
                        label="Precio"
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
                        helperText="Por favor agregar un elemento si desea que el producto tenga precios por defecto"
                      />
                    </form>
                    <List>
                      {form.prices.map((value) => {
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
                                  const newPrices = form.prices.filter(
                                    (elem) => elem !== value
                                  );

                                  setForm({ ...form, prices: newPrices });
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
                  onClick={onSubmit}
                >
                  Crear
                </Button>
              </div>
            </React.Fragment>
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
            Se agregó correctamente el producto al catálogo de productos o
            servicios.
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

export default CreateProduct;
