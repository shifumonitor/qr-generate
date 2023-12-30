import React from 'react';

interface TextareaProps {
  className?: string;
  id?: string;
  name?: string;          // Add this line
  placeholder?: string;
  value?: string;         // Add this line
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;  // Add this line
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ className, id, name, placeholder, value, onChange, required }) => {
  return (
    <textarea
      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${className}`}
      id={id}
      name={name}          // Add this line
      placeholder={placeholder}
      value={value}        // Add this line
      onChange={onChange}  // Add this line
      required={required}
    />
  );
};

export default Textarea;
