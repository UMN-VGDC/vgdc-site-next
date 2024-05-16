"use client";

import sendMessage from "@/actions/sendMessage";
import { useState } from "react";
import styles from "../_components/form.module.scss";
import SubmitButton from "../_components/SubmitButton";

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
      <SubmitButton submitStatus={submitStatus} successMessage="Message sent!" />
    </form>
  );
}
