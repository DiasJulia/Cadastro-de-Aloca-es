import { Button, Navbar, OperationForm, OperationTable } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";

export default function Operations() {
  const router = useRouter();
  const openModal = () => {
    router.push("/operations?modalOpen=true");
  };

  const closeModal = () => {
    // remove the modalOpen query param from the url and refresh the page
    router.push("/operations");
  };
  return (
    <main className={styles.main}>
      <Navbar />
      <OperationTable />
      <Button clickFunction={openModal} />
      <OperationForm
        modalOpen={router.query.modalOpen === "true"}
        closeModal={closeModal}
      />
    </main>
  );
}
