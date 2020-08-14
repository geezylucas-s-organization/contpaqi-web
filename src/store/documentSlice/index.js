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
    addCabecera: (state, action) => {
      console.log(action.payload);
      state.cabecera = action.payload;
    },
    decrement: (state) => state - 1,
  },
});

export const { addCabecera } = documentSlice.actions;

export default documentSlice.reducer;
