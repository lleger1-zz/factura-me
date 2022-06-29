import { useField, ErrorMessage } from "formik";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  autoFocus?: boolean;
  [x: string]: any;
}

export const TextBox = ({ label, autoFocus = false, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <>
      <div className="form-floating mb-3">
        <input
          autoFocus={autoFocus}
          className="form-control"
          {...field}
          {...props}
        />
        <label htmlFor={props.id || props.name}>{label}</label>
        <ErrorMessage name={props.name} component="span" />
      </div>
    </>
  );
};
