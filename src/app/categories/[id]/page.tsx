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
  const { id } = useParams<{ id: string }>();
  const { category } = useGetCategoryRepo({ id });

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
