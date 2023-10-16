import { Button, Navbar, OperationTable } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

export default function Operations() {
  const router = useRouter();
  const openModal = () => {
    router.push("/operations?modalOpen=true");
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <Container maxWidth="xl">
        <h1>Listagem de Operações</h1>
        <p>Realizadas em todos os Fundos</p>
        <br />
        <Button clickFunction={openModal} />
      </Container>
      <OperationTable />
    </main>
  );
}
