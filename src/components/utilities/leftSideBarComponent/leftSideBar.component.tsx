"use client";

import React, { FC } from "react";
import { ComponentBaseModel } from "@/models";
import { useRouter } from "next/navigation";
import { useCanGoBack } from "@/utils";
import { ButtonComponent } from "@/components";
import styles from "./component.module.css";
import { useLogoutRepo } from "@/repositories";

type LeftSideBarProps = ComponentBaseModel;
export const LeftSideBarComponent: FC<LeftSideBarProps> = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { logout } = useLogoutRepo({ onSuccess: () => router.push("/login") });

  const onClickHome = () => router.push("/app/categories");
  const onClickProfile = () => router.push("/app/profile");
  const onClickUsers = () => router.push("/app/users");
  const onClickCarts = () => router.push("/app/carts");

  return (
    <div className={styles.container}>
      <ButtonComponent
        title="Back"
        onClick={router.back}
        type="outline"
        style={{ opacity: canGoBack ? 1 : 0 }}
        disabled={!canGoBack}
      />

      <div className={styles.buttonWrapper}>
        <ButtonComponent title="Home" color="success" onClick={onClickHome} />
        <ButtonComponent title="Carts" color="warning" onClick={onClickCarts} />
        <ButtonComponent title="Profile" onClick={onClickProfile} />
        <ButtonComponent title="Users" onClick={onClickUsers} />
      </div>

      <ButtonComponent
        title="Logout"
        onClick={logout}
        type="outline"
        color="fail"
      />
    </div>
  );
};
