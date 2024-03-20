"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import { useGetAllCategoriesRepo, useLoginRepo } from "@/repositories";
import { useRouter } from "next/navigation";

const Page: ScreenBaseModel = () => {
  const route = useRouter();
  const { categories } = useGetAllCategoriesRepo();

  const onClick = (id: string) => () => {
    route.push(`/categories/${id}`);
  };

  return (
    <div>
      {categories?.map((category) => (
        <div key={category.id} onClick={onClick(category.id)}>
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
