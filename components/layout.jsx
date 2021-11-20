import Header from "@/components/header";
import styles from "@/styles/Layout.module.css";
import * as React from "react";
import {ToastPopup} from '@/components/toast';
import {LoadingUI} from '@/components/loading';
// TODO: figure out loading
export default function Layout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </>
  );
}
