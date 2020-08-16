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
  props,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [header, setHeader] = useState({
    date: moment(Date.now()).format("YYYY-MM-DD"),
    folio: 0,
    client: {
      code: "",
      businessName: "",
      rfc: "",
      currency: 1,
    },
    exchangeRate: "1.0000",
    concept: 5,
  });
  const [movements, setMovements] = useState([]);

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
  const concepts = [
    {
      value: 5,
      label: "Facturas al Contado",
    },
    {
      value: 6,
      label: "Facturas Crédito",
    },
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <EncabezadoForm
            header={header}
            setHeader={setHeader}
            concepts={concepts}
            currencies={currencies}
            clients={props.clientesYProveedores}
          />
        );
      case 1:
        return <MovimientosForm rows={movements} setRows={setMovements} />;
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
          tipoCambio: header.exchangeRate,
          codConcepto: header.concept,
          codigoCteProv: header.client.code,
          fecha: header.date,
        });
        break;
      case 2:
        addMovements(movements);
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

const mapStateToProps = (state) => ({ props: state.document.props });

const mapDispatchToProps = { addCabecera, addMovements, fetchPropsDoc };

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
