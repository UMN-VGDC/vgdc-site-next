"use client";

import { useState } from "react";
import styles from "../_components/form.module.scss";
import FormFieldFile from "../_components/FormComponents";

type GameFormData = {
    title: string;
    thumbnail: File | string;
    buildLink: string;
    description: string;
    credits: string;
    media0: File | string;
    media1: File | string;
    media2: File | string;
    date: string;
    themes: string;
    email: string;
}

export default function FormWrapper({ children }: { children: React.ReactNode }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as GameFormData;
    console.log(data.media2)
  };
  
  return (
    <form
      className={styles.basicForm}
      action={handleFormSubmit}
    >
      {children}
      <input className={`${isSubmitted ? styles.greyedOut : styles.submitButton} font-header`} type="submit"></input>
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
