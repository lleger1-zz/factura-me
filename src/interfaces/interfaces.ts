interface IAgent {
  name: string;
  rnc?: string;
  address: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  bornDate?: number;
}

export interface IUser {
  uid: string;
  email: string;
  name: string;
  agency?: IAgent;
}

export interface IInvoice {
  id?: string;
  concept: string;
  client: string;
  qty: number;
  price: number;
  taxes: number;
  subtotal: number;
  total: number;
  created: Date;
  user?: { uid: string; name: string };
  status?: boolean;
}

export interface InvoiceState {
  user?: IUser;
  invoices?: [IInvoice];
}
