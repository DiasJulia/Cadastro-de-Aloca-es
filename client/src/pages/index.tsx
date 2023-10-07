import { Button, Navbar, OperationForm, Table } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";

export default function Operations() {
  const router = useRouter();
  const openModal = () => {
    router.push("?modalOpen=true");
  };

  const closeModal = () => {
    router.push("/");
  };
  return (
    <main className={styles.main}>
      <Navbar />
      <Table />
      <Button clickFunction={openModal} />
      <OperationForm
        modalOpen={router.query.modalOpen === "true"}
        closeModal={closeModal}
      />
    </main>
  );
}
