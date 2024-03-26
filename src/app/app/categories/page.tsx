"use client";

import { ButtonComponent, InputTextComponent } from "@/components";
import { ScreenBaseModel, loginFormSchema } from "@/models";
import { useHookForm, utils } from "@/utils";
import React, { useEffect } from "react";
import { useGetAllCategoriesRepo } from "@/repositories";
import { usePathname, useRouter } from "next/navigation";
import { Table2 } from "./test/table2/table2";
import styles from "./page.module.css";
import Image from "next/image";
import containerStyles from "@/values/css/container.module.css";

const Page: ScreenBaseModel = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { categories } = useGetAllCategoriesRepo();

  const onClickAdd = () => router.push("/app/categories/add");
  const onClickCategory = (id: string) => () => {
    router.push(`/app/categories/${id}`);
  };
  const onClickEdit = (id: string) => () => {
    const path = `${pathname}/${id}/edit`;
    router.push(path);
  };

  // return <Table2 />;

  return (
    <div className={styles.container}>
      <h1>Categories</h1>

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

        {categories?.map(({ id, name, image, description }) => {
          const maximumChar = 30;
          const shortDescription =
            description && description?.length > maximumChar
              ? description.substring(0, maximumChar) + "..."
              : description;
          return (
            <div
              key={id}
              className={containerStyles.itemContainer}
              onClick={onClickCategory(id)}
            >
              <h3>{name}</h3>
              <Image
                src={utils.imageUrl(image)}
                alt={"Category"}
                width={100}
                height={100}
                className={styles.image}
              />

              <p className={styles.description}>{shortDescription}</p>

              <ButtonComponent
                title="Edit"
                onClick={onClickEdit(id)}
                type="outline"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
