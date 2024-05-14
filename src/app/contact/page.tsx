"use client";

import { useState } from "react";
import styles from "../_components/form.module.scss";
import { FormFieldText, FormFieldTextarea } from "../_components/FormComponents";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="relative mt-[140px] flex min-w-full flex-col items-center px-8">
      <div className="w-screen px-8 md:w-[768px]">
        <h2 className="w-full font-header text-4xl text-white">Contact Us</h2>
        <form
          className={styles.basicForm}
          onSubmit={(e) => {
            e.preventDefault()
            setIsSubmitted(true);
          }}
        >
          <FormFieldText label="Subject" isRequired />
          <FormFieldText label="Name" isRequired />
          <FormFieldTextarea label="Message" placeholder="Enter message" isRequired />
          <FormFieldText label="Email" isRequired />
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
