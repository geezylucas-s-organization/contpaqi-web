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

export const initialState = {
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
        label: "Dólar Americano",
      },
    ],
  },
  extraAPI: {
    productosYServicios: [],
    clientesYProveedores: [],
    conceptos: [],
  },
};

const documentSlice = createSlice({
  name: "document",
  initialState,
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
