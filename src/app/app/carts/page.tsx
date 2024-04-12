"use client";

import { ScreenBaseModel } from "@/models";
import { useGetAllCartsRepo } from "@/repositories";
import { dateUtil } from "@/utils";
import React from "react";
import styles from "./page.module.css";

const Page: ScreenBaseModel = () => {
  const { carts } = useGetAllCartsRepo();

  return (
    <div className={styles.container}>
      <h1>Carts</h1>

      <div className={styles.content}>
        {carts?.map((cart) => {
          const { id, createdAt, paidAt, quantity } = cart;
          const { name, color } = cart.item;
          const { role } = cart.user;

          return (
            <div key={id} className={styles.item}>
              <h4>{name}</h4>
              <p>Role: {role}</p>
              <p>Quantity: {quantity}</p>
              <p>Order at: {dateUtil.getDayTime(createdAt)}</p>
              <p>Paid at: {paidAt ? dateUtil.getDayTime(paidAt) : "/"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
