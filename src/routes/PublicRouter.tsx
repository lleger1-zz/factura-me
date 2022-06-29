import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  uid?: string;
  children: ReactElement;
}

export const PublicRouter = ({ children, uid }: Props) => {
  return !!uid ? <Navigate to="*" /> : children;
};
