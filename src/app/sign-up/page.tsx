"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, signUpFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React from "react";
import { useSignUpRepo } from "@/repositories";
import { useRouter } from "next/navigation";
import containerStyles from "@/values/css/container.module.css";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { control, handleSubmit } = useHookForm({
    schema: signUpFormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signUp, isPending } = useSignUpRepo({
    onSuccess: () => router.push("/login"),
  });

  const onClickSignUp = handleSubmit((data) => signUp(data));

  return (
    <div className={containerStyles.centerContainer}>
      <div className={containerStyles.smallFormContainer}>
        <h1>Sign up</h1>

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
          title="Sign up"
          onClick={onClickSignUp}
          isLoading={isPending}
        />
        <ButtonComponent
          title="Back"
          onClick={router.back}
          type="outline"
          color="warning"
        />
      </div>
    </div>
  );
};

export default Page;
