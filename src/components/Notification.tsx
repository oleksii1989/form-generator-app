import React from "react";

interface Props {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: Props) {
  return (
    <div
      className={`notification ${
        type === "success" ? "is-success" : "is-danger"
      }`}
    >
      <button className="delete" onClick={onClose}></button>
      {message}
    </div>
  );
}
