import { Button, Navbar, OperationForm, Table } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

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
      <p>Link api: {process.env.NEXT_PUBLIC_SERVER_HOST_EXTERNAL}</p>
      <Navbar />
      <Container maxWidth="xl">
        <h1>Resumo dos Investimentos</h1>
        <p>Sobre todos os Fundos com aplicações</p>
        <br />
        <Table />
        <Button clickFunction={openModal} />
      </Container>
      <OperationForm
        modalOpen={router.query.modalOpen === "true"}
        closeModal={closeModal}
      />
    </main>
  );
}
