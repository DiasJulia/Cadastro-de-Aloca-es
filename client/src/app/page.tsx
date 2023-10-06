import styles from "./page.module.css";
import { RegisterCota, Table } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Table />
      <RegisterCota />
    </main>
  );
}
