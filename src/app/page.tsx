"use client";

import styles from "./page.module.css";
import { ScreenBaseModel } from "@/models";
import { useFirstSetupApp } from "@/utils";

const Page: ScreenBaseModel = () => {
  useFirstSetupApp();

  return (
    <div className={styles.container}>
      <h1>Logo</h1>
    </div>
  );
};

export default Page;
