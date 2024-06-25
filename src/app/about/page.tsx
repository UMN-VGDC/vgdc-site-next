import { Suspense } from "react";
import Loading from "./loading";
import About from "./About";

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <About />
    </Suspense>
  );
}
