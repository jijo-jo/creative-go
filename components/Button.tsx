"use client";
import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
  return (
    <button
      className={`rounded-[52px] font-medium transition 
                  active:scale-95 
                  disabled:bg-gray-400 disabled:cursor-not-allowed 
                  ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
