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
  useDeleteCategoryRepo,
  useEditCategoryRepo,
  useGetAllCategoriesRepo,
  useGetCategoryRepo,
  useLoginRepo,
} from "@/repositories";
import { useParams, useRouter } from "next/navigation";
import containerStyles from "@/values/css/container.module.css";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { category } = useGetCategoryRepo({ id: categoryId });
  const { control, handleSubmit } = useHookForm({
    schema: addCategoryFormSchema,
    defaultValues: {
      name: category?.name,
      description: category?.description,
      image: category?.image,
    },
  });
  const { editCategory, isPending: isPendingEdit } = useEditCategoryRepo({
    onSuccess: router.back,
  });
  const { deleteCategory, isPending: isPendingDelete } = useDeleteCategoryRepo({
    onSuccess: router.back,
  });

  const onClickEdit = handleSubmit((data) =>
    editCategory({
      id: categoryId,
      ...data,
    })
  );
  const onClickDelete = () => {
    deleteCategory({ id: categoryId });
  };

  return (
    <div className={containerStyles.centerContainer}>
      <div className={containerStyles.formContainer}>
        <h1>Edit category</h1>

        <InputTextComponent control={control} name="name" placeholder="name" />
        <InputTextComponent
          control={control}
          name="description"
          placeholder="description"
        />
        {/* <InputTextComponent control={control} name="image" /> */}

        <ButtonComponent
          title="Edit"
          onClick={onClickEdit}
          isLoading={isPendingEdit}
          type="outline"
        />
        <ButtonComponent
          title="Delete"
          onClick={onClickDelete}
          isLoading={isPendingDelete}
          type="outline"
          color="fail"
        />
      </div>
    </div>
  );
};

export default Page;
