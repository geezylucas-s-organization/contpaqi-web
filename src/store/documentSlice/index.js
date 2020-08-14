import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    addCabecera: (state, action) => (state.cabecera = action.payload),
    addMovements: (state, action) => (state.movimientos = action.payload),
  },
});

export const { addCabecera, addMovements } = documentSlice.actions;

export default documentSlice.reducer;
