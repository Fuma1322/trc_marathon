import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export default function Input({ label, hint, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-gray-800">
        {label}{props.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-gray-400 focus:border-[#25D366] focus:ring-4 focus:ring-green-100 ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
