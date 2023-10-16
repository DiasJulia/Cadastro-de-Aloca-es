import { HistoryChart, Navbar } from "@/components";
import styles from "../app/page.module.css";
import { useRouter } from "next/router";

export default function History() {
  const router = useRouter();

  const cnpj = router.query.cnpj;

  return (
    <main className={styles.main}>
      <Navbar />
      <h1>Histórico de Saldos de Aplicação</h1>
      {cnpj && <p>no fundo de cnpj: {cnpj}</p>}
      <br />
      <HistoryChart cnpj={cnpj as string} />
    </main>
  );
}
