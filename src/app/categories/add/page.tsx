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
import { useParams, useRouter } from "next/navigation";

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
  const { addCategory } = useAddCategoryRepo({
    onSuccess: () => router.back(),
  });

  const onClickAdd = handleSubmit((data) => addCategory(data));

  return (
    <div>
      <h1>page</h1>
      <InputTextComponent control={control} name="name" />
      <InputTextComponent control={control} name="description" />
      <InputTextComponent control={control} name="image" />

      <ButtonComponent title="Add" onClick={onClickAdd} />
    </div>
  );
};

export default Page;
