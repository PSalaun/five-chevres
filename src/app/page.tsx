import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>Five chèvres</h1>
        <Link href="/composition">Créer une compo</Link>
      </div>
    </main>
  );
}
