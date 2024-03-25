"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm } from "@/utils";
import React, { useEffect } from "react";
import {
  useDeleteCategoryRepo,
  useGetAllCategoriesRepo,
  useLoginRepo,
} from "@/repositories";
import { useRouter } from "next/navigation";
import { Table2 } from "./test/table2/table2";
import styles from "./page.module.css";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const { categories } = useGetAllCategoriesRepo();
  const { deleteCategory } = useDeleteCategoryRepo();

  const onClickAdd = () => router.push("/categories/add");
  const onClickCategory = (id: string) => () => {
    router.push(`/categories/${id}`);
  };
  const onClickDelete = (id: string) => () => {
    deleteCategory({ id });
  };

  // return <Table2 />;

  return (
    <div className={styles.container}>
      {categories?.map(({ id, name }) => (
        <div key={id} className={styles.wrapper} onClick={onClickCategory(id)}>
          <p>{name}</p>

          <ButtonComponent title="Delete" onClick={onClickDelete(id)} />
        </div>
      ))}
      <ButtonComponent title="Add Category" onClick={onClickAdd} />
    </div>
  );
};

export default Page;
