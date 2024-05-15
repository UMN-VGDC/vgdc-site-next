"use client";

import sendMessage from "@/actions/sendMessage";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import styles from "../_components/form.module.scss";
import Loader from "../_components/Loader";

export type ContactData = {
  subject: string;
  name: string;
  message: string;
  email: string;
};

export default function FormWrapper({ children }: { children: React.ReactNode }) {
  const [submitStatus, setSubmitStatus] = useState<number>();
  const handleFormSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as ContactData;
    const response = await sendMessage(data);
    setSubmitStatus(response.status);
  };

  return (
    <form className={styles.basicForm} action={handleFormSubmit}>
      {children}
      <SubmitButton submitStatus={submitStatus} />
    </form>
  );
}

function SubmitButton({ submitStatus }: { submitStatus: number | undefined }) {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        className={`${pending || submitStatus === 200 ? styles.greyedOut : styles.submitButton} font-header`}
        type="submit"
        disabled={pending || submitStatus === 200}
      ></input>
      <div
        className={`flex w-full overflow-hidden items-center justify-center transition-all ${
          pending || submitStatus ? "mt-4 h-12" : "mt-0 h-0"
        }`}
      >
        {pending && <Loader />}
        {!pending && submitStatus === 200 && "Message sent!"}
        {!pending && submitStatus === 500 && "An error occurred"}
      </div>
    </>
  );
}
