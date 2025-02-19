import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variants: "success" | "danger" | "warning" | "info";
  outline?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variants,
  outline,
  onClick,
  type,
}: ButtonProps) {
  const success = variants === "success";
  const danger = variants === "danger";
  const warning = variants === "warning";
  const info = variants === "info";
  if (outline) {
    if (success) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-white text-green-500 border  border-green-500 px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    } else if (warning) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-white text-yellow-500 border  border-yellow-500 px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    } else if (danger) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-white text-red-500 border  border-red-500 px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    } else if (info) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-white text-blue-500 border  border-blue-500 px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    }
  } else {
    if (success) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    } else if (warning) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    } else if (danger) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    } else if (info) {
      return (
        <button
          onClick={onClick}
          type={type}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {children}
        </button>
      );
    }
  }
}
