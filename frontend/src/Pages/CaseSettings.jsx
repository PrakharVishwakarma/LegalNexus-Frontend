// frontend/src/Pages/CaseSettings.jsx

import { CaseAccessProvider } from "../context/CaseAccessContext";
import SettingsContent from "../Components/CaseSetting/SettingsContent";

const CaseSettings = () => {
  return (
    <CaseAccessProvider>
      <SettingsContent />
    </CaseAccessProvider>
  );
};

export default CaseSettings;
