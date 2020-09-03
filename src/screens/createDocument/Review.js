import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Grid,
  ListItemText,
  ListItem,
  List,
  Typography,
} from "@material-ui/core";
import { financial } from "../../utils";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const reducerTotal = (accumulator, currentValue) => accumulator + currentValue;

const Review = ({ cabecera, movimientos }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Revisar documento
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Encabezado
          </Typography>
          <Typography gutterBottom>Fecha: {cabecera.fecha}</Typography>
          <Typography gutterBottom>Concepto: {cabecera.nomConcepto}</Typography>
          <Typography gutterBottom>Folio: {cabecera.folio}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Cliente
          </Typography>
          <Typography gutterBottom>
            Nombre: {cabecera.codigoCteProv} {cabecera.nomCteProv}
          </Typography>
          <Typography gutterBottom>Moneda: {cabecera.nomMoneda}</Typography>
          <Typography gutterBottom>
            Tipo de cambio: {cabecera.tipoCambio}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List disablePadding>
        {movimientos.map((product, i) => (
          <ListItem className={classes.listItem} key={i}>
            <ListItemText
              primary={product.nomProducto}
              secondary={`Cantidad: ${product.unidades}`}
            />
            <Typography variant="body2">{product.total}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total de productos" />
          <Typography variant="subtitle1" className={classes.total}>
            {movimientos.length > 0 &&
              financial(
                movimientos.map((o) => o.unidades).reduce(reducerTotal)
              )}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {movimientos.length > 0 &&
              financial(
                movimientos
                  .map((o) => parseFloat(o.total))
                  .reduce(reducerTotal) / 1.16
              )}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="I.V.A" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {movimientos.length > 0 &&
              financial(
                (movimientos
                  .map((o) => parseFloat(o.total))
                  .reduce(reducerTotal) /
                  1.16) *
                  0.16
              )}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {movimientos.length > 0 &&
              financial(
                movimientos.map((o) => parseFloat(o.total)).reduce(reducerTotal)
              )}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Review;
