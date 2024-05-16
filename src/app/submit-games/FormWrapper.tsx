"use client";

import sendGame from "@/actions/sendGame";
import { useState } from "react";
import styles from "../_components/form.module.scss";
import FormFieldFile from "../_components/FormComponents";
import SubmitButton from "../_components/SubmitButton";

export default function FormWrapper({ children }: { children: React.ReactNode }) {
  const [submitStatus, setSubmitStatus] = useState<number>();

  const handleFormSubmit = async (formData: FormData) => {
    const response = await sendGame(formData);
    setSubmitStatus(response.status);
  };

  return (
    <form className={styles.basicForm} action={handleFormSubmit}>
      {children}
      <SubmitButton submitStatus={submitStatus} successMessage="Game sent!" />
    </form>
  );
}

export function ThumbnailUpload() {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files[0].size > 4194304) {
      alert("File is too big!");
      e.target.value = "";
    }
  };

  return (
    <FormFieldFile
      label="Thumbnail Image"
      title="maximum 4 MB"
      accept="image/png, image/jpeg, image/jpg"
      isRequired
      changeEvent={handleImageUpload}
    />
  );
}
