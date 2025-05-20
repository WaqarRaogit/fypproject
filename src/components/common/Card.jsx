const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;