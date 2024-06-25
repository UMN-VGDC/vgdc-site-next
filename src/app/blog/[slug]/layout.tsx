import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative w-full overflow-hidden">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
