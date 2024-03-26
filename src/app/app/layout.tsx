import { LayoutBaseModel } from "@/models";
import { LeftSideBarComponent } from "@/components";
import styles from "./layout.module.css";

const Layout: LayoutBaseModel = ({ children }) => {
  return (
    <div className={styles.container}>
      <LeftSideBarComponent />

      <div className={styles.child}>{children}</div>
    </div>
  );
};

export default Layout;
