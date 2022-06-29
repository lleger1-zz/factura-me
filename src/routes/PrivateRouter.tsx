import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  uid?: string;
  children: ReactElement;
}

export const PrivateRouter = ({ children, uid }: Props) => {
  // console.log(location)

  return !!uid ? children : <Navigate to="/login" />;
};
