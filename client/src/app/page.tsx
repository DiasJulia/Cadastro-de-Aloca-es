import styles from "./page.module.css";
import { OperationTable, RegisterCota, Table } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Table />
      <RegisterCota />
      <OperationTable />
    </main>
  );
}
