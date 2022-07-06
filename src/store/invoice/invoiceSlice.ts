import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceState, IInvoice } from "../../interfaces/interfaces";

const initialState: InvoiceState = {
  loading: false,
  invoices: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    onAddNewEvent: (state, { payload }: PayloadAction<IInvoice>) => {
      state.invoices.push(payload);
    },
    onDeleteEvent: (state, { payload }: PayloadAction<IInvoice>) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== payload.id
      );
    },
    onLoadEvents: (state, { payload }: PayloadAction<IInvoice[]>) => {
      state.loading = true;
      // state.events = payload;
      payload.forEach((invoice) => {
        const exists = state.invoices.some(
          (dbEvent) => dbEvent.id === invoice.id
        );
        if (!exists) {
          state.invoices.push(invoice);
        }
      });
      // state.loading = false;
    },
    onLogoutInvoice: (state) => {
      (state.loading = false), (state.invoices = []);
    },
    onFinishLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutInvoice,
  onFinishLoading,
} = invoiceSlice.actions;
