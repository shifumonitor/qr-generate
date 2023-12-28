// src/app/components/ui/CardContent.jsx

const CardContent = ({ children, className }) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default CardContent;
