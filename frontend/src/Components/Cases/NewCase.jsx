import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authAtom";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";

const NewCase = ({ onClose }) => {
    const navigate = useNavigate();
    const token = useRecoilValue(authTokenState);
    const { showFlash } = useFlashMessage();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            courtName: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/cases/create",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            showFlash(response.status < 400 ? "success" : "error", response.data.message);
            reset();
            onClose();
            navigate("/cases");
        } catch (err) {
            console.error("Case creation failed:", err);
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    const errorMessages = err.response.data.errors
                        .map((error) => `${error.path.join(".")}: ${error.message}`)
                        .join("\n");
                    showFlash("error", errorMessages);
                } else {
                    showFlash("error", err.response.data.message || "Failed to create case");
                }
            } else {
                showFlash("error", err.message || "Failed to create case");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Close"
                >
                    <AiOutlineClose size={24} />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Create New Case
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Case Title<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                {...register("title", { required: "Title is required", minLength: { value: 3, message: "Minimum 3 characters required" } })}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.title ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                disabled={isSubmitting}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Case Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description")}
                                rows="4"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                                disabled={isSubmitting}
                            ></textarea>
                        </div>

                        {/* Court Name */}
                        <div>
                            <label
                                htmlFor="courtName"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Court Name
                            </label>
                            <input
                                id="courtName"
                                type="text"
                                {...register("courtName")}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Submit & Cancel */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-24"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    "Create Case"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

NewCase.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default NewCase;
