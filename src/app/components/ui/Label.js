// src/app/components/ui/Label.jsx

const Label = ({ children, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
};

export default Label;
