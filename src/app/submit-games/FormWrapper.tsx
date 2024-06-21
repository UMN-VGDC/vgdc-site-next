"use client";

import sendGame from "@/actions/sendGame";
import { useState } from "react";
import styles from "../_components/form.module.scss";
import FormFieldFile from "../_components/FormComponents";
import SubmitButton from "../_components/SubmitButton";

async function getImgurLink(image: File) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const data = await fetch("https://api.imgur.com/3/image/", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
    },
    body: buffer,
  });
  const res = await data.json();
  return res.data.link;
}

export default function FormWrapper({ children }: { children: React.ReactNode }) {
  const [submitStatus, setSubmitStatus] = useState<number>();

  const handleFormSubmit = async (formData: FormData) => {

    let images: File[] = [
      formData.get("thumbnail image"),
      formData.get("media0"),
      formData.get("media1"),
      formData.get("media2"),
    ].filter((e) => e) as File[];
    images = images.filter((e) => e.size);

    try {
      const promises = images.map((e) => getImgurLink(e));
      const imageLinks = await Promise.all(promises);
      formData.set("thumbnail image", imageLinks[0])
      formData.set("media0", imageLinks[1])
      formData.set("media1", imageLinks[2])
      formData.set("media2", imageLinks[3])
  
      const response = await sendGame(formData);
      setSubmitStatus(response.status);
    } catch (err) {
      console.error(err)
    }
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
