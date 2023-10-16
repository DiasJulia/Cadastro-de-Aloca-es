import { Button, Navbar, OperationTable } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";

export default function Operations() {
  const router = useRouter();
  const openModal = () => {
    router.push("/operations?modalOpen=true");
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <OperationTable />
      <Button clickFunction={openModal} />
    </main>
  );
}
