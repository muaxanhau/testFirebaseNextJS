"use client";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import styles from "./component.module.css";
import { HTMLInputTypeAttribute } from "react";

type InputTextProps<T extends FieldValues> = UseControllerProps<T> & {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  title?: string;
};
export function InputTextComponent<T extends FieldValues>({
  type,
  placeholder,
  title,
  ...rest
}: InputTextProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(rest);

  return (
    <div className={styles.container}>
      <p>{title}</p>
      <input
        {...field}
        placeholder={placeholder}
        className={styles.input}
        security="•"
        type={type}
      />
      <p className={styles.error} style={{ opacity: !!error?.message ? 1 : 0 }}>
        {error?.message || "_"}
      </p>
    </div>
  );
}
