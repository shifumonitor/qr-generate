// src/app/components/ui/Input.jsx

const Input = ({ className, id, name, placeholder, required, type, value, onChange }) => {
  return (
    <input
      type={type || 'text'}
      id={id}
      name={name}
      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${className}`}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};


export default Input;
