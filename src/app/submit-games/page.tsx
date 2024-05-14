"use client";

import { useState } from "react";
import styles from "../_components/form.module.scss";
import FormFieldFile, { FormFieldText, FormFieldTextarea } from "../_components/FormComponents";
import MultiFileInput from "./MultiFileInput";

export default function SubmitGames() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files[0].size > 4194304) {
      alert("File is too big!");
      e.target.value = "";
    }
  };

  return (
    <main className="relative mt-[140px] flex min-w-full flex-col items-center px-8">
      <div className="w-screen px-8 md:w-[768px]">
        <h2 className="w-full font-header text-4xl text-white">Submit Games</h2>
        <form
          className={styles.basicForm}
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitted(true);
          }}
        >
          <FormFieldText label="Title" isRequired />
          <FormFieldFile
            label="Thumbnail Image"
            title="maximum 4 MB"
            accept="image/png, image/jpeg, image/jpg"
            isRequired
            changeEvent={handleImageUpload}
          />
          <FormFieldText label="Build Link" placeholder="Optional, but highly encouraged" />
          <FormFieldTextarea label="Description" placeholder="Enter your game description. Optional" />
          <FormFieldTextarea label="Credits" placeholder="Who worked on your game?. Optional" />
          <MultiFileInput />
          <div className="flex w-full flex-col md:flex-row md:gap-5">
            <FormFieldText label="Date" placeholder="Fall 2022, Winter Game Jam 2023" />
            <FormFieldText label="Theme(s)" placeholder="Clumsy Pirates, Roll the Dice" />
          </div>
          <FormFieldText label="UMN Email" placeholder="xxx001@umn.edu" pattern=".+(@umn\.edu|#\d{4})" isRequired />
          <div>
            <input
              className={`${isSubmitted ? styles.greyedOut : styles.submitButton} font-header`}
              type="submit"
              id="Submit"
              name="Submit"
            ></input>
          </div>
        </form>
      </div>
    </main>
  );
}
