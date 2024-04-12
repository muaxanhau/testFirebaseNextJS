"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React from "react";
import { useLoginRepo } from "@/repositories";
import { useRouter } from "next/navigation";
import containerStyles from "@/values/css/container.module.css";

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
    onSuccess: () => router.replace("/app/categories"),
  });

  const onClickLogin = handleSubmit((data) => login(data));
  const onClickSignUp = () => router.push("/sign-up");

  return (
    <div className={containerStyles.centerContainer}>
      <div className={containerStyles.smallFormContainer}>
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
          isLoading={isPending}
        />
        <ButtonComponent
          title="Sign up"
          onClick={onClickSignUp}
          type="outline"
        />
      </div>
    </div>
  );
};

export default Page;
