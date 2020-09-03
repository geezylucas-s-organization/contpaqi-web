import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPropsDoc = createAsyncThunk(
  "document/fetchPropsDoc",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5007/api/Documento/FillView"
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState: {
    cabecera: {
      numMoneda: 0,
      tipoCambio: "",
      codConcepto: "",
      codigoCteProv: "",
      fecha: "",
    },
    movimientos: [],
    extra: {
      currencies: [
        {
          value: 1,
          label: "Peso Mexicano",
        },
        {
          value: 2,
          label: "Dólar Mexicano",
        },
      ],
    },
    extraAPI: {
      productosYServicios: [
        {
          codigo: "PROD1",
          nombre: "alimento para mascotas",
          precios: null,
        },
      ],
      clientesYProveedores: [
        {
          codigo: "PROV1",
          razonSocial: "prosis copilco sa de cv",
          rfc: "PRO010609AAA",
          moneda: 1,
        },
      ],
      conceptos: [
        {
          codigoConcepto: 5,
          nombreConcepto: "Factura al Contado",
          noFolio: 54,
        },
      ],
    },
  },
  reducers: {
    addCabecera: (state, action) => {
      state.cabecera = action.payload;
    },
    addMovements: (state, action) => {
      state.movimientos = action.payload;
    },
  },
  extraReducers: {
    [fetchPropsDoc.fulfilled]: (state, action) => {
      state.extraAPI = action.payload;
    },
  },
});

export const { addCabecera, addMovements } = documentSlice.actions;

export default documentSlice.reducer;
