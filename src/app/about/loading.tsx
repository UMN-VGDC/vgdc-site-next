import Loader from "@/app/_components/Loader";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center opacity-30">
      <Loader />
    </div>
  );
}
