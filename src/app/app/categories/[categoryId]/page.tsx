"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm, utils } from "@/utils";
import React, { useEffect } from "react";
import {
  useDeleteItemRepo,
  useGetAllCategoriesRepo,
  useGetCategoryRepo,
  useGetCategoryWithAllItemsRepo,
  useLoginRepo,
} from "@/repositories";
import { useParams, usePathname, useRouter } from "next/navigation";
import containerStyles from "@/values/css/container.module.css";
import Image from "next/image";
import styles from "./page.module.css";

const Page: ScreenBaseModel = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const { categoryWithAllItems } = useGetCategoryWithAllItemsRepo({
    id: categoryId,
  });
  const { deleteItem } = useDeleteItemRepo();

  const onClickAdd = () => router.push(`${pathname}/items`);
  const onClickDelete = (id: string) => () => deleteItem({ id });

  return (
    <div className={styles.container}>
      <h1>{categoryWithAllItems?.name}</h1>
      <p>{categoryWithAllItems?.description}</p>

      <h3>Items</h3>

      <div className={containerStyles.listContainer}>
        <div className={containerStyles.itemContainer} onClick={onClickAdd}>
          <Image
            src="/img_plus.png"
            alt={"Category"}
            width={100}
            height={100}
            className={styles.imagePlus}
          />
          <h3>Create</h3>
        </div>

        {categoryWithAllItems?.items.map(({ id, name, color }) => {
          return (
            <div key={id} className={containerStyles.itemContainer}>
              <h3>{name}</h3>

              <p className={styles.description}>Color: {color}</p>

              <ButtonComponent
                title="Delete"
                onClick={onClickDelete(id)}
                type="outline"
                color="fail"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
