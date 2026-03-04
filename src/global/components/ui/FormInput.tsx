import { error } from "console";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errors?: string[];
}

const FormInput = ({ name, label, errors, className, ...props }: Props) => {
  const hasErrors = errors && errors.length > 0;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        className={[
          "rounded-md border px-3 py-2 text-sm shadow-sm outline-none transition-colors",
          "placeholder:text-gray-400",
          "focus:ring-2 focus:ring-offset-1",
          hasErrors
            ? "border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-400 focus:ring-blue-200",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {hasErrors && (
        <ul id={`${name}-errors`} className="flex flex-col gap-0.5">
          <li className="text-xs text-red-500">{errors[0]}</li>
        </ul>
      )}
    </div>
  );
};

export default FormInput;
