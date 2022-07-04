interface IAgency {
  name: string;
  rnc?: string;
  address: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  bornDate?: Date;
}

export interface IUser {
  uid: string;
  email: string;
  name: string;
  agency?: IAgency;
}

export interface IInvoice {
  id?: string;
  concept: string;
  client?: string;
  qty: number;
  price: number;
  taxes: number;
  subtotal: number;
  total: number;
  created: Date;
  user?: { uid: string; name: string };
  status?: boolean;
}

export interface UserState {
  status: string;
  user?: IUser;
  errorMessage?: string;
}

export interface InvoiceState {
  loading: boolean;
  invoices: IInvoice[];
}

export interface createInvoiceResponse {
  ok: boolean;
  invoice: IInvoice;
}

export interface authRequestResponse {
  ok: boolean;
  token: string;
  user: IUser;
}
