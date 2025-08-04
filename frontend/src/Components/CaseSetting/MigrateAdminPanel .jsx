// frontend/src/Pages/Settings/MigrateAdminPanel.jsx

import { useState } from "react";
import ChangeAdminModal from "./ChangeAdminModal";
import PropTypes from "prop-types";

const MigrateAdminPanel = ({ caseId, adminWallet }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="border border-gray-300 rounded-lg p-5 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          🔁 Migrate Admin Access
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Change Admin
        </button>
      </div>

      <p className="text-gray-600 text-sm">
        As the current admin, you can transfer administrative rights to another
        participant in this case. This action is irreversible unless the new
        admin migrates it back.
      </p>

      <ChangeAdminModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        currentAdminWallet={adminWallet}
      />
    </section>
  );
};

MigrateAdminPanel.propTypes = {
  caseId: PropTypes.string.isRequired,
  adminWallet: PropTypes.string.isRequired
};

export default MigrateAdminPanel;
