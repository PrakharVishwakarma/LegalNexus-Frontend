// frontend/src/context/CaseAccessContext.jsx

import { createContext, useState, useMemo } from "react";

import PropTypes from "prop-types";

const CaseAccessContext = createContext();

const CaseAccessProvider = ({ children }) => {
    const [isUserCaseAdmin, setIsUserCaseAdmin] = useState(null);
    const [hasUserViewAccess, setHasUserViewAccess] = useState(null);
    const [hasUserUploadAccess, setHasUserUploadAccess] = useState(null); 

    // Dynamically compute loading state
  const caseAccessLoading = useMemo(() => {
    return (
      isUserCaseAdmin === null ||
      hasUserViewAccess === null ||
      hasUserUploadAccess === null
    );
  }, [isUserCaseAdmin, hasUserViewAccess, hasUserUploadAccess]);

    return (
        <CaseAccessContext.Provider
            value={{
                isUserCaseAdmin,
                hasUserViewAccess,
                hasUserUploadAccess,
                setIsUserCaseAdmin,
                setHasUserViewAccess,
                setHasUserUploadAccess,
                caseAccessLoading
            }}
        >
            {children}
        </CaseAccessContext.Provider>
    );
};

CaseAccessProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { CaseAccessContext, CaseAccessProvider };