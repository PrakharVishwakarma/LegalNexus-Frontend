// frontend/src/Pages/Case.jsx

import { CaseAccessProvider } from "../context/CaseAccessContext";

import CaseDetails from "../Components/Case/CaseDetails";


const Case = () => {
    return (<>
        <CaseAccessProvider>
            <CaseDetails />
        </CaseAccessProvider>
    </>
    );
};

export default Case;
