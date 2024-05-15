"use client";

import sendMessage from "@/actions/sendMessage";
import { useState } from "react";
import styles from "../_components/form.module.scss";

export type ContactData = {
  subject: string;
  name: string;
  message: string;
  email: string;
}

export default function FormWrapper({ children }: { children: React.ReactNode }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as ContactData;
    sendMessage(data)
  };

  return (
    <form className={styles.basicForm} action={handleFormSubmit}>
      {children}
      <input
        className={`${isSubmitted ? styles.greyedOut : styles.submitButton} font-header`}
        type="submit"
      ></input>
    </form>
  );
}
