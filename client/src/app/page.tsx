import styles from "./page.module.css";
import { Navbar, RegisterCota, Table } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Table />
      <RegisterCota />
    </main>
  );
}
