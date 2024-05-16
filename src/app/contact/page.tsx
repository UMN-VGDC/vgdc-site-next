import { FormFieldText, FormFieldTextarea } from "../_components/FormComponents";
import FormWrapper from "./FormWrapper";

export default function ContactUs() {
  return (
    <main className="relative mt-[140px] flex min-w-full flex-col items-center px-8">
      <div className="w-screen px-8 md:w-[768px]">
        <h2 className="w-full font-header text-4xl text-white">Contact Us</h2>
        <FormWrapper>
          <FormFieldText label="Subject" isRequired />
          <FormFieldText label="Name" isRequired/>
          <FormFieldTextarea label="Message" placeholder="Enter message" isRequired />
          <FormFieldText label="Email" isRequired/>
        </FormWrapper>
      </div>
    </main>
  );
}
