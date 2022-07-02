import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { invoiceApi } from "../apis";
import { onAddNewEvent, onDeleteEvent, onLoadEvents } from "../store";
import { useAppSelector } from "./reduxHook";
import { IInvoice } from "../interfaces/interfaces";

export const useInvoiceStore = () => {
  const dispatch = useDispatch();
  const { loading, invoices } = useAppSelector((state) => state.invoice);
  const { user } = useAppSelector((state) => state.auth);

  const startSavingInvoice = async (invoice: IInvoice) => {
    try {
      // Creando
      const { data } = await invoiceApi.post("/invoices", invoice);
      console.log(data);
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
