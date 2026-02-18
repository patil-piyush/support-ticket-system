const Button = ({ children, type = "button", onClick }) => {
    return (
      <button type={type} className="btn" onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;
  