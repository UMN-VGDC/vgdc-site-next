"use client"
import { useFormStatus } from "react-dom"
import Loader from "../_components/Loader";
import styles from "./form.module.scss";

interface SubmitButton {
  submitStatus: number | undefined;
  successMessage: string;
}

export default function SubmitButton({ submitStatus, successMessage }: SubmitButton) {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        className={`${pending || submitStatus === 200 ? styles.greyedOut : styles.submitButton} font-header`}
        type="submit"
        disabled={pending || submitStatus === 200}
      ></input>
      <div
        className={`flex w-full items-center justify-center overflow-hidden transition-all ${
          pending || submitStatus ? "mt-4 h-12" : "mt-0 h-0"
        }`}
      >
        {pending && <Loader />}
        {!pending && submitStatus === 200 && successMessage}
        {!pending && submitStatus === 500 && "An error occurred"}
      </div>
    </>
  );
}
