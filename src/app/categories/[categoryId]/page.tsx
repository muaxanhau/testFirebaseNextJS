"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import {
  useGetAllCategoriesRepo,
  useGetCategoryRepo,
  useLoginRepo,
} from "@/repositories";
import { useParams } from "next/navigation";

const Page: ScreenBaseModel = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { category } = useGetCategoryRepo({ id: categoryId });

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  return (
    <div>
      <h1>{category?.name}</h1>
    </div>
  );
};

export default Page;
