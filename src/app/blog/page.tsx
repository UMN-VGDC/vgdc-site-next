import { Suspense } from "react";
import ArticlePanels from "./ArticlePanels";
import styles from "./styles.module.scss";
import Loading from "./loading";

export default async function Page() {
  return (
    <div className="relative flex w-full justify-center">
      <main className={`${styles.panelContainer}`}>
        <Suspense fallback={<Loading />}>
          <ArticlePanels />
        </Suspense>
      </main>
    </div>
  );
}
