"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import { useGetAllCategoriesRepo, useLoginRepo } from "@/repositories";

const Page: ScreenBaseModel = () => {
  const { categories } = useGetAllCategoriesRepo();

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  return (
    <div>
      {categories?.map((category) => (
        <div key={category.id}>
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
