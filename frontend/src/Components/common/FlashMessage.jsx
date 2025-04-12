// frontend/src/Components/common/FlashMessage.jsx

import { useFlash } from "../../context/useFlash";

const FlashMessage = () => {
  const { message } = useFlash();

  if (!message) return null;

  const color =
    message.type === "success"
      ? "bg-green-500"
      : message.type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div
      className={`${color} text-white px-4 py-2 rounded-md fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg z-50`}
    >
      {message.text}
    </div>
  );
};

export default FlashMessage;
