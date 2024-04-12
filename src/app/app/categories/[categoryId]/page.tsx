"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm, utils } from "@/utils";
import React, { useEffect } from "react";
import {
  useDeleteCategoryRepo,
  useDeleteItemRepo,
  useGetAllCategoriesRepo,
  useGetCategoryRepo,
  useGetCategoryWithAllItemsRepo,
  useLoginRepo,
} from "@/repositories";
import { useParams, useRouter } from "next/navigation";
import containerStyles from "@/values/css/container.module.css";
import Image from "next/image";
import styles from "./page.module.css";

const Page: ScreenBaseModel = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const router = useRouter();
  const { categoryWithAllItems } = useGetCategoryWithAllItemsRepo({
    id: categoryId,
  });
  const { deleteItem, isPending: isPendingDeleteItem } = useDeleteItemRepo({
    categoryId,
  });
  const { deleteCategory, isPending: isPendingDeleteCategory } =
    useDeleteCategoryRepo({ onSuccess: router.back });

  const onClickEditCategory = () => {
    router.push(`${categoryId}/edit`);
  };
  const onClickDeleteCategory = () => deleteCategory({ id: categoryId });
  const onClickAddItem = () => router.push(`${categoryId}/items/add`);
  const onClickDeleteItem = (itemId: string) => () => deleteItem({ itemId });
  const onClickEditItem = (itemId: string) => () => {};

  return (
    <div className={styles.container}>
      <h1>{categoryWithAllItems?.name}</h1>
      <div className={styles.buttonCategoryContainer}>
        <ButtonComponent
          title="Edit"
          type="outline"
          onClick={onClickEditCategory}
        />
        <ButtonComponent
          title="Delete"
          type="outline"
          color="fail"
          onClick={onClickDeleteCategory}
          isLoading={isPendingDeleteCategory}
        />
      </div>
      <p>{categoryWithAllItems?.description}</p>

      <h3>Items</h3>

      <div className={containerStyles.listContainer}>
        <div className={containerStyles.itemContainer} onClick={onClickAddItem}>
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

              <div className={styles.buttonItemContainer}>
                <ButtonComponent
                  title="Edit"
                  onClick={onClickEditItem(id)}
                  type="outline"
                  disabled
                />

                <ButtonComponent
                  title="Delete"
                  onClick={onClickDeleteItem(id)}
                  type="outline"
                  color="fail"
                  isLoading={isPendingDeleteItem}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
