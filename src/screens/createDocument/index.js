import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { EncabezadoForm, MovimientosForm, Review } from "../../components";
import {
  addCabecera,
  addMovements,
  fetchPropsDoc,
} from "../../store/documentSlice";

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
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

const steps = ["Encabezado", "Movimientos", "Revisar"];

const CreateDocument = ({
  addCabecera,
  addMovements,
  fetchPropsDoc,
  extraAPI,
  currencies,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [header, setHeader] = useState({
    date: moment(Date.now()).format("YYYY-MM-DD"),
    folio: "",
    client: {
      code: "",
      businessName: "",
      rfc: "",
      currency: "",
      nomCurrency: "",
    },
    exchangeRate: "1.0000",
    concept: "",
    nomConcept: "",
  });

  const [movements, setMovements] = useState([]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <EncabezadoForm
            header={header}
            setHeader={setHeader}
            concepts={extraAPI.conceptos}
            clientsVendors={extraAPI.clientesYProveedores}
            currencies={currencies}
          />
        );
      case 1:
        return (
          <MovimientosForm
            rows={movements}
            setRows={setMovements}
            productsServices={extraAPI.productosYServicios}
          />
        );
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  useEffect(() => {
    fetchPropsDoc();
  }, [fetchPropsDoc]);

  useEffect(() => {
    switch (activeStep) {
      case 1:
        addCabecera({
          numMoneda: header.client.currency,
          nomMoneda: header.client.nomCurrency,
          tipoCambio: header.exchangeRate,
          codConcepto: header.concept,
          nomConcepto: header.nomConcept,
          codigoCteProv: header.client.code,
          nomCteProv: header.client.businessName,
          fecha: header.date,
          folio: header.folio,
        });
        break;
      case 2:
        addMovements(
          movements.map((o) => ({
            codAlmacen: 1,
            codProducto: o.codigo,
            nomProducto: o.nombre,
            precio: o.precio,
            unidades: o.cantidad,
            total: o.total,
          }))
        );
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <Container maxWidth="lg">
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Nuevo documento
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Documento creado.
                </Typography>
                <Typography variant="subtitle1">
                  En un momento se timbrará el documento y será exportado para
                  su visualización o administración.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      className={classes.button}
                    >
                      Anterior
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep(activeStep + 1)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Crear" : "Siguiente"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  extraAPI: state.document.extraAPI,
  currencies: state.document.extra.currencies,
});

const mapDispatchToProps = { addCabecera, addMovements, fetchPropsDoc };

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
