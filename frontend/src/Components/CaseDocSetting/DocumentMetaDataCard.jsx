// frontend/src/Components/CaseDocSetting/DocumentMetaDataCard.jsx
import PropTypes from "prop-types";

const DocumentMetaDataCard = ({ document }) => {
  const {
    title,
    fileType,
    fileSize,
    encrypted,
    ipfsCid,
    uploadedBy,
    createdAt,
  } = document;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        🧾 Document Metadata
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Title:</span> {title}
        </div>
        <div>
          <span className="font-medium">Uploaded By:</span> {uploadedBy}
        </div>
        <div>
          <span className="font-medium">Created At:</span>{" "}
          {new Date(createdAt).toLocaleString()}
        </div>
        <div>
          <span className="font-medium">File Type:</span> {fileType}
        </div>
        <div>
          <span className="font-medium">File Size:</span>{" "}
          {(fileSize / 1024).toFixed(2)} KB
        </div>
        <div>
          <span className="font-medium">Encrypted:</span>{" "}
          {encrypted ? "Yes 🔒" : "No"}
        </div>
        <div className="col-span-full">
          <span className="font-medium">IPFS CID:</span>{" "}
          <a
            href={`https://ipfs.io/ipfs/${ipfsCid}`}
            className="text-blue-600 underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ipfsCid.slice(0, 8)}...{ipfsCid.slice(-8)}
          </a>
        </div>
      </div>
    </div>
  );
};

DocumentMetaDataCard.propTypes = {
  document: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    encrypted: PropTypes.bool.isRequired,
    ipfsCid: PropTypes.string.isRequired,
    uploadedBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default DocumentMetaDataCard;
