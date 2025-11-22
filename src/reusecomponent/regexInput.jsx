import React from "react";

export default function RegexInput({
  label,
  name,
  type = "text",
  value,
  regex,
  error,
  onChange,
  disabled
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} 
          ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
