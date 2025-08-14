// frontend/src/Components/Register/SignUpform.jsx

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import SpinnerLoader from "../common/SpinnerLoader";
import OtpVerificationModal from "./OtpVerificationModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const roles = ["Civilian", "Judge", "Lawyer", "Police"];

const Signup = () => {
  const { showFlash } = useFlashMessage();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpPhoneNumber, setOtpPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      role: "Civilian",
      firstName: "",
      lastName: "",
      aadharNumber: "",
      phoneNumber: "+91",
      userId: "",
      employeeId: "",
      password: "",
    },
  });

  const selectedRole = watch("role");

  // React Query mutation for signup
  const signupMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData,
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      showFlash(data.message, "success");
      setOtpPhoneNumber(variables.phoneNumber);
      setIsOtpModalOpen(true);
    },
    onError: (error) => {
      showFlash(
        error.response?.data?.message || "Signup failed",
        "error"
      );
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <>
      <div id="signupBox" className="up-down shadow-xl hover:shadow-blue-500/60 rounded-lg">
        <p style={{ margin: "0.4rem 0 0.6rem 0", fontSize: "2.2rem", fontWeight: "normal" }}>
          Signup on LegalNexus
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="signFormBox">
          <label>
            Role:
            <select
              {...register("role")}
              style={{ marginRight: "14.5rem" }}
              className="shadow-xl focus:shadow-none"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>

          <label>
            First Name:
            <input
              type="text"
              placeholder="John"
              {...register("firstName", { required: true })}
              className="shadow-lg focus:shadow-none"
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              placeholder="Doe"
              {...register("lastName", { required: true })}
              className="shadow-lg focus:shadow-none"
            />
          </label>

          <label>
            Aadhar Number:
            <input
              type="text"
              placeholder="12 digit Aadhar number"
              {...register("aadharNumber", {
                required: true,
                minLength: 12,
                maxLength: 12,
              })}
              className="shadow-lg focus:shadow-none"
            />
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              {...register("phoneNumber", { required: true })}
              className="shadow-lg focus:shadow-none"
            />
          </label>

          {selectedRole === "Civilian" ? (
            <label>
              User ID:
              <input
                type="text"
                placeholder="johnDoe01"
                {...register("userId", { required: true })}
                className="shadow-lg focus:shadow-none"
              />
            </label>
          ) : (
            <label>
              Employee ID:
              <input
                type="text"
                placeholder="Employee Identity Card Id"
                {...register("employeeId", { required: true })}
                className="shadow-lg focus:shadow-none"
              />
            </label>
          )}

          <label>
            Password:
            <input
              type="password"
              placeholder="@95Zln70"
              {...register("password", { required: true, minLength: 6 })}
              className="shadow-lg focus:shadow-none"
            />
          </label>

          <button
            type="submit"
            className="p-[3px] relative w-44"
            disabled={signupMutation.isPending || isOtpModalOpen }
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg" />
            <div className="px-8 py-[0.7rem] bg-blue-500 rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center">
              {signupMutation.isPending || isOtpModalOpen ? <SpinnerLoader /> : "Sign Up"}
            </div>
          </button>
        </form>

        <div className="mt-2">
          <p>
            Already have an account?
            <Link className="text-blue-700 hover:text-purple-500" to="/login"> Login</Link>
          </p>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {isOtpModalOpen && (
        <OtpVerificationModal
          phoneNumber={otpPhoneNumber}
          onClose={() => setIsOtpModalOpen(false)}
        />
      )}
    </>
  );
};

export default Signup;
