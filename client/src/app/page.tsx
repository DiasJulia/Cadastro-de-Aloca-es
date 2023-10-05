import styles from './page.module.css'
import { Table } from '@/components'

export default function Home() {
  return (
    <main className={styles.main}>
      <Table />
    </main>
  )
}
