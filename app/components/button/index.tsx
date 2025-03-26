import React from "react";
import './button.css'; // Import the CSS file for styles

// Define the props type
interface ButtonProps {
  label: string;
  onClick: () => void;
  size?: "small" | "medium" | "large"; // Added size prop
}

const Button: React.FC<ButtonProps> = ({ label, onClick, size = "medium" }) => { // Default size to medium
  return (
    <div className="button-border">
      <div className="button-base">
        <button className={`button ${size}`} onClick={onClick}> 
          {label}
        </button>
      </div>
    </div>
  );
};

export default Button; 