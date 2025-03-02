import React from "react";
import './button.css'; // Import the CSS file for styles

// Define the props type
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className="button-border">
      <div className="button-base">
        <button className="button" onClick={onClick}>
          {label}
        </button>
      </div>
    </div>
  );
};

export default Button; 