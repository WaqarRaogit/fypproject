const Input = ({ id, name, type = 'text', value, onChange, placeholder, required = false, className = '', error = false }) => {
    return (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
    );
  };
  
  export default Input;