import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import styles from "./component.module.css";

export function InputTextComponent<T extends FieldValues>(
  props: UseControllerProps<T>
) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{error?.message}</p>
    </div>
  );
}
