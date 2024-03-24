import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import styles from "./component.module.css";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

type InputTextProps<T extends FieldValues> = UseControllerProps<T> & {
  type?: HTMLInputTypeAttribute | undefined;
};
export function InputTextComponent<T extends FieldValues>({
  type,
  ...rest
}: InputTextProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(rest);

  return (
    <div className={styles.container}>
      <input
        {...field}
        placeholder={rest.name}
        className={styles.input}
        security="•"
        type={type}
      />
      <p style={{ opacity: !!error?.message ? 1 : 0 }}>
        {error?.message || "_"}
      </p>
    </div>
  );
}
