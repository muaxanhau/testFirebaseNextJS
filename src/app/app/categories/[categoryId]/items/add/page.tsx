"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import {
  ScreenBaseModel,
  addCategoryFormSchema,
  addItemFormSchema,
  loginFormSchema,
} from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import {
  useAddCategoryRepo,
  useAddItemRepo,
  useGetAllCategoriesRepo,
  useGetCategoryRepo,
  useLoginRepo,
} from "@/repositories";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import containerStyles from "@/values/css/container.module.css";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { control, handleSubmit } = useHookForm({
    schema: addItemFormSchema,
    defaultValues: {
      name: "",
      color: "",
      categoryId,
    },
  });
  const { addItem, isPending } = useAddItemRepo({ onSuccess: router.back });

  const onClickAdd = handleSubmit((data) => addItem(data));

  return (
    <div className={containerStyles.centerContainer}>
      <div className={containerStyles.formContainer}>
        <h1>Add item</h1>

        <InputTextComponent control={control} name="name" placeholder="name" />
        <InputTextComponent
          control={control}
          name="color"
          placeholder="color"
        />

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
