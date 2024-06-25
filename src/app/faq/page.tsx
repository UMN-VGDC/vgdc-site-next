import { Suspense } from "react";
import FAQ from "./FAQ";
import Loading from "./loading";

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <FAQ />
    </Suspense>
  );
}
