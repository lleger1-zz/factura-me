import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { invoiceApi } from "../apis";
import { onAddNewEvent, onLoadEvents } from "../store";
import { useAppSelector } from "./reduxHook";
import { IInvoice, createInvoiceResponse } from "../interfaces/interfaces";

export const useInvoiceStore = () => {
  const dispatch = useDispatch();
  const { invoices } = useAppSelector((state) => state.invoice);

  const startSavingInvoice = async (invoice: IInvoice) => {
    try {
      // Creando
      const { data } = await invoiceApi.post<createInvoiceResponse>(
        "/invoices",
        invoice
      );
      dispatch(onAddNewEvent({ ...data.invoice }));
    } catch (error: any) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  //   const startDeletingEvent = async () => {
  //     // Todo: Llegar al backend
  //     try {
  //       await calendarApi.delete(`/events/${activeEvent.id}`);
  //       dispatch(onDeleteEvent());
  //     } catch (error) {
  //       console.log(error);
  //       Swal.fire("Error al eliminar", error.response.data.msg, "error");
  //     }
  //   };

  const startLoadingInvoices = async () => {
    try {
      const { data } = await invoiceApi.get("/invoices");
      // console.log(data);
      dispatch(onLoadEvents(data.invoices));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    // activeEvent,
    invoices,
    // hasEventSelected: !!activeEvent,

    //* Métodos
    // setActiveEvent,
    // startDeletingEvent,
    startLoadingInvoices,
    startSavingInvoice,
  };
};
