import { Navbar, OperationTable } from "@/components";
import styles from "../app/page.module.css";

export default function Operations() {
  return (
    <main className={styles.main}>
      <Navbar />
      <OperationTable />
    </main>
  );
}
