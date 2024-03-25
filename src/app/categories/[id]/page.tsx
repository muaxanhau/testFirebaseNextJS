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
import { useParams, usePathname, useRouter } from "next/navigation";

const Page: ScreenBaseModel = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const { category } = useGetCategoryRepo({ id });

  const onClick = () => {
    router.push(`${pathname}/items`);
  };

  return (
    <div>
      <h1>{category?.name}</h1>
      <p>{category?.description}</p>

      <ButtonComponent title="Add Item" onClick={onClick} />
    </div>
  );
};

export default Page;
