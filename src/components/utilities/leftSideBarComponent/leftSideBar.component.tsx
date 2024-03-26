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
  const { logout } = useLogoutRepo({
    onSuccess: () => {
      router.push("/login");
    },
  });

  return (
    <div className={styles.container}>
      {canGoBack && (
        <ButtonComponent title="Back" onClick={router.back} type="outline" />
      )}

      <ButtonComponent
        title="Logout"
        onClick={logout}
        type="outline"
        color="fail"
      />
    </div>
  );
};
