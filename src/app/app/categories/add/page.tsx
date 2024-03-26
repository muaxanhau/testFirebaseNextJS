"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import {
  ScreenBaseModel,
  addCategoryFormSchema,
  loginFormSchema,
} from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import {
  useAddCategoryRepo,
  useGetAllCategoriesRepo,
  useGetCategoryRepo,
  useLoginRepo,
} from "@/repositories";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { control, handleSubmit } = useHookForm({
    schema: addCategoryFormSchema,
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });
  const { addCategory, isPending } = useAddCategoryRepo({
    onSuccess: router.back,
  });

  const onClickAdd = handleSubmit((data) => addCategory(data));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Add category</h1>
        <InputTextComponent control={control} name="name" placeholder="name" />
        <InputTextComponent
          control={control}
          name="description"
          placeholder="description"
        />
        {/* <InputTextComponent control={control} name="image" /> */}

        <ButtonComponent
          title="Add"
          onClick={onClickAdd}
          isLoading={isPending}
          color="success"
        />
      </div>
    </div>
  );
};

export default Page;
