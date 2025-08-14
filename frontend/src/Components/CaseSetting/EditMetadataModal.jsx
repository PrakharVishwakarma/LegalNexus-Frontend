// frontend/src/Components/CaseSetting/EditMetadataModal.jsx

import { useForm } from "react-hook-form";
import { useUpdateMetadata } from "../../Hooks/useUpdateMetadata";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import SpinnerLoader2 from "../common/SpinnerLoader2";


const EditMetadataModal = ({ isOpen, onClose, initialData, caseId, onSuccess }) => { 
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ defaultValues: initialData });

    const { mutate: updateMetadata } = useUpdateMetadata();

    const onSubmit = (data) => {
        updateMetadata({ caseId, data }, { onSuccess });
    };

    // 🔁 Reset form values every time modal opens with fresh initialData
    useEffect(() => {
        if (isOpen) {
            reset(initialData);
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-lg">
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                    aria-label="Close Modal"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="font-bold mb-4 text-gray-800 dark:text-white text-center">
                    Edit Case Metadata
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-200">Title</label>
                        <input
                            {...register("title", { required: true, minLength: 3 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">Title is required (min 3 chars)</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-200">Description</label>
                        <textarea
                            {...register("description", { required: true, minLength: 10 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded h-24 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">Min 10 characters</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-200">Court Name</label>
                        <input
                            {...register("courtName", { required: true, minLength: 3 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                        {errors.courtName && (
                            <p className="text-red-500 text-sm">Min 3 characters</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                        >
                            {isSubmitting ? <SpinnerLoader2/> : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EditMetadataModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    initialData: PropTypes.object.isRequired,
    caseId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default EditMetadataModal;
