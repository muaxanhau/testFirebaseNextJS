"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React from "react";
import styles from "./page.module.css";
import { useLoginRepo } from "@/repositories";
import { useRouter } from "next/navigation";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { control, handleSubmit } = useHookForm({ schema: loginFormSchema });
  const { login } = useLoginRepo({
    onSuccess: () => router.push("/categories"),
  });

  const onClickLogin = handleSubmit((data) => login(data));

  return (
    <div className={styles.container}>
      <h1>page</h1>
      <InputTextComponent control={control} name="email" />
      <InputTextComponent control={control} name="password" />

      <ButtonComponent title="Login" onClick={onClickLogin} />
    </div>
  );
};

export default Page;
