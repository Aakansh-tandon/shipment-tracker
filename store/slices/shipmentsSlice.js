import { createSlice } from "@reduxjs/toolkit";
import mockShipments from "@/data/mockShipments";

const initialState = {
  shipments: mockShipments,
  filters: {
    status: "All",
    carrier: "All",
    searchQuery: "",
  },
  selectedShipment: null,
  currentPage: 1,
};

const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
      state.currentPage = 1;
    },
    setCarrierFilter(state, action) {
      state.filters.carrier = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery(state, action) {
      state.filters.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSelectedShipment(state, action) {
      state.selectedShipment = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setStatusFilter,
  setCarrierFilter,
  setSearchQuery,
  setSelectedShipment,
  setCurrentPage,
} = shipmentsSlice.actions;

export default shipmentsSlice.reducer;
