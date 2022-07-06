import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { invoiceApi } from "../apis";
import { onAddNewEvent, onFinishLoading, onLoadEvents } from "../store";
import { useAppSelector } from "./reduxHook";
import {
  IInvoice,
  CreateInvoiceResponse,
  GetAllInvoicesResponse,
} from "../interfaces/interfaces";

export const useInvoiceStore = () => {
  const dispatch = useDispatch();
  const { invoices, loading } = useAppSelector((state) => state.invoice);

  const startSavingInvoice = async (invoice: IInvoice) => {
    try {
      // Creando
      const { data } = await invoiceApi.post<CreateInvoiceResponse>(
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
      const { data } = await invoiceApi.get<GetAllInvoicesResponse>(
        "/invoices"
      );

      dispatch(onLoadEvents(data.invoices));
      // dispatch(onFinishLoading);
      // console.log(loading);
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    // activeEvent,
    invoices,
    // loading,
    // hasEventSelected: !!activeEvent,

    //* Métodos
    // setActiveEvent,
    // startDeletingEvent,
    startLoadingInvoices,
    startSavingInvoice,
  };
};
