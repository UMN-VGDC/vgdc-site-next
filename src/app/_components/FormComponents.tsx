type FormFieldText = React.AllHTMLAttributes<HTMLInputElement> & {
  label: string;
  isRequired?: boolean;
};

export function FormFieldText({ label, isRequired, ...props }: FormFieldText) {
  return (
    <div className="w-full">
      <label htmlFor={label} className="font-header">
        {label}
        {isRequired && <span>*</span>}
      </label>
      <input type="text" required={isRequired} id={label} name={label.toLowerCase()} {...props}></input>
    </div>
  );
}

type FormFieldTextarea = React.AllHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  isRequired?: boolean;
};

export function FormFieldTextarea({ label, isRequired, ...props }: FormFieldTextarea) {
  return (
    <div>
      <label htmlFor={label} className="font-header">
        {label}
        {isRequired && <span>*</span>}
      </label>
      <textarea id={label} name={label.toLowerCase()} required={isRequired} {...props}></textarea>
    </div>
  );
}

type FormFieldFile = React.AllHTMLAttributes<HTMLInputElement> & {
  label: string;
  isRequired?: boolean;
  changeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormFieldFile({ label, isRequired, changeEvent, ...props }: FormFieldFile) {
  return (
    <div>
      <label htmlFor={label} className="font-header">
        {label}
        {isRequired && <span>*</span>}
      </label>
      <input
        type="file"
        id={label}
        required={isRequired}
        name={label.toLowerCase()}
        onChange={changeEvent}
        {...props}
      ></input>
    </div>
  );
}
