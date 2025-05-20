const Button = ({ children, onClick, disabled, className = '', variant = 'primary' }) => {
    const baseStyles = 'py-3 px-4 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;