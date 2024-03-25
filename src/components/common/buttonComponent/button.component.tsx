import { ComponentBaseModel } from "@/models";
import React, { FC } from "react";
import styles from "./component.module.css";

type TypeType = "default" | "outline";
type ColorType = "default" | "success" | "warning" | "fail";

type ButtonProps = ComponentBaseModel<{
  title: string;
  onClick: () => void;
  type?: TypeType;
  color?: ColorType;
  disabled?: boolean;
  isLoading?: boolean;
}>;
export const ButtonComponent: FC<ButtonProps> = ({ onClick, title }) => {
  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className={styles.container} onClick={onClickButton}>
      <p>{title}</p>
    </button>
  );
};
