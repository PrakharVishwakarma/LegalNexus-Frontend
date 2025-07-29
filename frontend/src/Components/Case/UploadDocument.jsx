// frontend/src/Components/Case/UploadDocument.jsx

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineUploadFile } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useUploadDocument } from "../../Hooks/useUploadDocument";

const UploadDocument = ({ isOpen, onClose, caseId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      encrypted: false,
    },
  });

  // ✅ Pass caseId to hook to enable refetching after upload
  const { uploadDocument, isUploading, error } = useUploadDocument(caseId);

  // Handle Escape key to close modal
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [isOpen, onClose]);

  const onSubmit = async (data) => {
    if (!data.file?.[0]) return;

    const success = await uploadDocument({
      caseId,
      file: data.file[0],
      title: data.title,
      encrypted: data.encrypted,
    });

    if (success) {
      reset();     // ✅ Clear form fields
      onClose();   // ✅ Close modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md rounded-2xl shadow-lg p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            reset();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoClose
            size={26}
            color="red"
            className="hover:border-2 border-neutral-200 rounded-lg hover:bg-gray-100 hover:animate-pulse"
          />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
          Upload Document
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter document title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-lg font-medium mb-1">Select File</label>
            <input
              type="file"
              {...register("file", { required: "File is required" })}
              className="w-4/6 border border-gray-400 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">
                {errors.file.message}
              </p>
            )}
          </div>

          {/* Encryption Toggle */}
          <label className="inline-flex items-center text-sm gap-2">
            <input
              type="checkbox"
              {...register("encrypted")}
              className="scale-125 hover:scale-150 focus:outline-none"
            />
            Encrypt file before storing
          </label>

          {/* Backend Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="px-4 py-2 border border-gray-400 text-sm rounded hover:bg-gray-200 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-900 flex items-center gap-2 hover:shadow-md hover:shadow-slate-500"
            >
              <MdOutlineUploadFile size={22} className="hover:animate-pulse" />
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UploadDocument.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  caseId: PropTypes.string.isRequired,
};

export default UploadDocument;
