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
  const { control, handleSubmit } = useHookForm({
    schema: loginFormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, isPending } = useLoginRepo({
    onSuccess: () => router.push("/app/categories"),
  });

  const onClickLogin = handleSubmit((data) => login(data));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login</h1>

        <InputTextComponent
          control={control}
          name="email"
          placeholder="email"
        />
        <InputTextComponent
          control={control}
          name="password"
          type="password"
          placeholder="password"
        />

        <ButtonComponent
          title="Login"
          onClick={onClickLogin}
          type="outline"
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default Page;
