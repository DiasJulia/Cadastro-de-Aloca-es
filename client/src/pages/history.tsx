import { Navbar, OperationLineChart } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

export default function History() {
  const router = useRouter();

  const cnpj = router.query.cnpj;

  return (
    <main className={styles.main}>
      <Navbar />
      <Container maxWidth="xl">
        <h1>Histórico de Saldos de Aplicação</h1>
        {cnpj && <p>no fundo de cnpj: {cnpj}</p>}
        <br />
        <OperationLineChart cnpj={cnpj as string} />
      </Container>
    </main>
  );
}
