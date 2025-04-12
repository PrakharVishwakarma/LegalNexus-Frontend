// frontend/src/context/useFlash.js

import { useContext } from "react";
import FlashMessageContext from "./FlashMessageContext";

export const useFlash = () => useContext(FlashMessageContext);
