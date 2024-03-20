"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import { useGetAllCategoriesRepo, useLoginRepo } from "@/repositories";
import { useRouter } from "next/navigation";
import { Table2 } from "./test/table2/table2";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { categories } = useGetAllCategoriesRepo();

  const onClickCategory = (id: string) => () => {
    router.push(`/categories/${id}`);
  };
  const onClickAdd = () => router.push("/categories/add");

  return <Table2 />;

  return (
    <div>
      <ButtonComponent title="Add Category" onClick={onClickAdd} />

      {categories?.map((category) => (
        <div key={category.id} onClick={onClickCategory(category.id)}>
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
