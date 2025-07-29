// frontend/src/context/useCaseAccess.js

import { useContext } from "react";
import { CaseAccessContext } from "./CaseAccessContext";

export const useCaseAccess = () => {
  const context = useContext(CaseAccessContext);

  // console.log("context is : ",context);

  if (!context) {
    throw new Error("useCaseAccess must be used within a CaseAccessProvider");
  }

  return context;
};
