import { FormFieldText, FormFieldTextarea } from "../_components/FormComponents";
import FormWrapper, { ThumbnailUpload } from "./FormWrapper";
import MultiFileInput from "./MultiFileInput";

export default function SubmitGames() {
  return (
    <main className="relative mt-[140px] flex min-w-full flex-col items-center px-8">
      <div className="w-screen px-8 md:w-[768px]">
        <h2 className="w-full font-header text-4xl text-white">Submit Games</h2>
        <FormWrapper>
          <FormFieldText label="Title" isRequired />
          <ThumbnailUpload />
          <FormFieldText label="Build Link" placeholder="Optional, but highly encouraged" />
          <FormFieldTextarea label="Description" placeholder="Enter your game description. Optional" />
          <FormFieldTextarea label="Credits" placeholder="Who worked on your game? Optional" />
          <MultiFileInput />
          <div className="flex w-full flex-col md:flex-row md:gap-5">
            <FormFieldText label="Date" placeholder="Fall 2022, Winter Game Jam 2023" />
            <FormFieldText label="Theme(s)" placeholder="Clumsy Pirates, Roll the Dice" />
          </div>
          <FormFieldText label="UMN Email" placeholder="xxx001@umn.edu" pattern=".+(@umn\.edu|#\d{4})" isRequired />
        </FormWrapper>
      </div>
    </main>
  );
}
