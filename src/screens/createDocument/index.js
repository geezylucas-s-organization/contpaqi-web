import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import EncabezadoForm from "./EncabezadoForm";
import MovimientosForm from "./MovimientosForm";
import Review from "./Review";
import {
  addCabecera,
  addMovements,
  fetchPropsDoc,
} from "../../store/documentSlice";
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
  cabecera,
  movimientos,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [movements, setMovements] = useState([]);
  const [sendingData, setSendingData] = useState(true);
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
  const [template, setTemplate] = useState(false);
  const [stamp, setStamp] = useState(true);

  const getStepContent = (step) => {
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
        return (
          <Review
            cabecera={cabecera}
            movimientos={movimientos}
            template={template}
            setTemplate={setTemplate}
            stamp={stamp}
            setStamp={setStamp}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  useEffect(() => {
    //fetchPropsDoc();
  }, [fetchPropsDoc]);

  useEffect(() => {
    const sendDataAsync = async (data) => {
      try {
        await axios.post("http://localhost:5007/api/Documento/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSendingData(false);
      } catch (error) {
        console.log(error);
      }
    };

    switch (activeStep) {
      case 1:
        addCabecera({
          numMoneda: header.client.currency,
          nomMoneda: header.client.nomCurrency,
          tipoCambio: parseInt(header.exchangeRate, 10),
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
            precio: parseInt(o.precio),
            unidades: parseInt(o.cantidad),
            total: financial(o.total),
          }))
        );
        break;
      case 3:
        // TODO: add template state
        const data = {
          cabecera: {
            numMoneda: cabecera.numMoneda,
            serie: {
              m_MaxCapacity: 2147483647,
              Capacity: 16,
              m_StringValue: "",
              m_currentThread: 0,
            },
            tipoCambio: cabecera.tipoCambio,
            codConcepto: cabecera.codConcepto.toString(),
            codigoCteProv: cabecera.codigoCteProv,
            fecha: moment(cabecera.fecha).format("MM/DD/YYYY"),
          },
          movimientos: movimientos.map((o) => ({
            codAlmacen: o.codAlmacen,
            codProducto: o.codProducto,
            precio: o.precio,
            unidades: o.unidades,
          })),
        };

        sendDataAsync(data);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <React.Fragment>
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
              sendingData ? (
                <Grid container justify="center">
                  <CircularProgress size={50} />
                </Grid>
              ) : (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Documento creado.
                  </Typography>
                  <Typography variant="subtitle1">
                    Documento creado y timbrado con éxito.
                  </Typography>
                  {template && (
                    <Typography variant="subtitle1">
                      Vaya a la pestaña de "Adminitrar facturas automáticas"
                      para terminar de configurar su nueva plantilla.
                    </Typography>
                  )}
                </React.Fragment>
              )
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
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  extraAPI: state.document.extraAPI,
  currencies: state.document.extra.currencies,
  cabecera: state.document.cabecera,
  movimientos: state.document.movimientos,
});

const mapDispatchToProps = { addCabecera, addMovements, fetchPropsDoc };

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
