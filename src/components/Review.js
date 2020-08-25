import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Divider,
    Grid,
    ListItemText,
    ListItem,
    List,
    Typography,
} from "@material-ui/core";

const products = [
    {
        id: 1,
        name: "PROD1 - alimento para mascotas",
        desc: "Cantidad: 10.0 - precio: $200.0",
        price: "$2320.00",
    },
    {
        id: 2,
        name: "PROD1 - alimento para mascotas",
        desc: "Cantidad: 1.0 - precio: $200.0",
        price: "$200.00",
    },
];

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

const Review = () => {
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
                    <Typography gutterBottom>Fecha: 31/07/2020</Typography>
                    <Typography gutterBottom>Folio: 38</Typography>
                    <Typography gutterBottom>Moneda: Peso Mexicano</Typography>
                    <Typography gutterBottom>Tipo de cambio: 1.0000</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Cliente
                    </Typography>
                    <Typography gutterBottom>Clave: PROV1</Typography>
                    <Typography gutterBottom>Nombre: prosis copilco sa de cv</Typography>
                </Grid>
            </Grid>
            <Divider/>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.id}>
                        <ListItemText primary={product.name} secondary={product.desc}/>
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total de productos"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        11
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Subtotal"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        $2200.00
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="I.V.A"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        $352.00
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        $2552.00
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
};

export default Review;
