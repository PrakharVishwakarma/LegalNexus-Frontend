// frontend/src/context/FlashMessageContext.jsx

import { createContext, useState } from "react";
import PropTypes from "prop-types";

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });

    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  return (
    <FlashMessageContext.Provider value={{ message, showMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

FlashMessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlashMessageContext;
