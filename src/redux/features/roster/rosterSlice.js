import { createSlice } from "@reduxjs/toolkit";

const rosterSlice = createSlice({
  name: "roster",
  initialState: {
    selectedTable: "Roster",
  },
  reducers: {
    setTable: (state, action) => {
      state.selectedTable = action.payload;
    },
  },
});

export const { setTable } = rosterSlice.actions;

export default rosterSlice.reducer;
