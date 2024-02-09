import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import NavBar from "@/app/components/NavBar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>Five chèvres</h1>
      </div>
    </main>
  );
}
