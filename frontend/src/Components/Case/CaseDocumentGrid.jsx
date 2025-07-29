// frontend/src/Components/Case/CaseDocumentGrid.jsx

import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { memo, useState } from "react";
import {
  FaRegImage,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaFileExcel,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { TbSettingsBolt } from "react-icons/tb";
import { MdAudioFile } from "react-icons/md";

import ViewDocumentModal from "./ViewDocumentModal"; // ✅ New import
import "./CaseDocumentTable.css";

// Icon utility
const getFileIcon = (type) => {
  const map = {
    pdf: <FaFilePdf className="text-red-500 w-24 h-24" />,
    document: <FaFileWord className="text-blue-500 w-24 h-24" />,
    docx: <FaFileWord className="text-blue-500 w-24 h-24" />,
    txt: <FaFileAlt className="text-gray-500 w-24 h-24" />,
    xls: <FaFileExcel className="text-green-600 w-24 h-24" />,
    xlsx: <FaFileExcel className="text-green-600 w-24 h-24" />,
    png: <FaRegImage className="text-blue-500 w-24 h-24" />,
    jpg: <FaRegImage className="text-blue-500 w-24 h-24" />,
    jpeg: <FaRegImage className="text-blue-500 w-24 h-24" />,
    mp4: <RxVideo className="text-black-500 w-24 h-24" />,
    sheet: <BsFillFileEarmarkSpreadsheetFill className="text-green-700 w-24 h-24" />,
    mpeg: <MdAudioFile className="text-blue-500 w-24 h-24" />,
  };

  return map[type.toLowerCase()] || (
    <FaFileAlt className="text-gray-400 w-16 h-16" />
  );
};

const CaseDocumentGrid = memo(({ documents }) => {
  const [activeDocId, setActiveDocId] = useState(null);
  const caseId = useParams().caseId;
  const navigate = useNavigate();

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6"
        style={{ marginTop: "3rem" }}
      >
        {documents.map((doc) => {
          const {
            _id,
            title,
            fileType,
            fileSize,
            createdAt,
            encrypted,
          } = doc;

          return (
            <div
              key={_id}
              className="border rounded-xl shadow-sm hover:shadow-md transition-all bg-white p-4 flex flex-col justify-between "
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold truncate max-w-[80%]">
                  {title}
                </h3>
                <div onClick={() => navigate(`/cases/${caseId}/doc/${_id}/settings`)}>
                  <TbSettingsBolt
                    size={28}
                    color="darkblue"
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center items-center h-36 hover:cursor-pointer hover:scale-110"
                onClick={() => setActiveDocId(_id)}>
                {getFileIcon(fileType.split("/")[1]?.split(".")?.pop())}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-700">
                <div className="border rounded px-2 py-1 text-center">
                  <span className="font-semibold block">Type</span>
                  {fileType.split("/")[0]}/{fileType.split("/")[1]?.split(".")?.pop()}
                </div>
                <div className="border rounded px-2 py-1 text-center">
                  <span className="font-semibold block">Size</span>
                  {(fileSize / 1024).toFixed(2)} KB
                </div>
                <div className="border rounded px-2 py-1 text-center col-span-1">
                  <span className="font-semibold block">Encrypted</span>
                  {encrypted ? (
                    <FaLock className="text-red-600 inline ml-1" />
                  ) : (
                    <FaLockOpen className="text-green-600 inline ml-1" />
                  )}
                </div>
                <div className="border rounded px-2 py-1 text-center col-span-1">
                  <span className="font-semibold block">Created</span>
                  {createdAt.split("T")[0]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Modal Component */}
      {activeDocId && (
        <ViewDocumentModal
          docId={activeDocId}
          onClose={() => setActiveDocId(null)}
        />
      )}
    </>
  );
});

CaseDocumentGrid.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CaseDocumentGrid.displayName = "CaseDocumentGrid";

export default CaseDocumentGrid;
