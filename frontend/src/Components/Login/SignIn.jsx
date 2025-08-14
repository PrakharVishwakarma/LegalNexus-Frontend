// frontend/src/Components/SignIn.jsx

import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authAtom";
import { loginUser } from "../../utils/authUtils";
import { useFlashMessage } from "../../Hooks/useFlashMessage";
import DotLoader from "../common/DotLoader";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const roles = ["Admin", "Civilian", "Judge", "Lawyer", "Police"];

const SignIn = () => {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authTokenState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const { showFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "Civilian",
      identifier: "",
      password: "",
    },
  });

  const selectedRole = watch("role");
  const isUserIdRequired = selectedRole === "Civilian" || selectedRole === "Admin";

  // React Query mutation
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      loginUser({ setAuthToken, setIsAuthenticated }, data.token);
      showFlash("success", "Login successful!");
      navigate("/");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      showFlash("error", message);
      setError("identifier", { type: "manual", message }); // Optional
    },
  });

  const onSubmit = (data) => {
    signIn(data);
  };

  return (
    <div id="signinBox" className="shadow-xl rounded-lg hover:shadow-blue-500/60 up-down">
      <p
        style={{
          margin: "0.4rem 0 0.6rem 0",
          fontSize: "2.2rem",
          fontWeight: "bold",
        }}
      >
        SignIn on LegalNexus
      </p>

      <form className="signFormBox" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Role:
          <select
            {...register("role")}
            style={{ marginRight: "14.4rem" }}
            className="shadow-lg focus:shadow-none"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        {isUserIdRequired ? (
          <label>
            User ID:
            <input
              type="text"
              placeholder="Enter User ID"
              className="shadow-lg focus:shadow-none"
              {...register("identifier", { required: "User ID is required" })}
            />
          </label>
        ) : (
          <label>
            Employee ID:
            <input
              type="text"
              placeholder="Enter Employee Identity Card ID"
              className="shadow-lg focus:shadow-none"
              {...register("identifier", {
                required: "Employee ID is required",
              })}
            />
          </label>
        )}

        <label>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            className="shadow-lg focus:shadow-none"
            minLength="6"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </label>

        <button
          type="submit"
          className="p-[3px] relative w-44"
          disabled={isPending}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg" />
          <div className="px-8 py-[0.5rem] bg-blue-500 rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center">
            {isPending ? <DotLoader /> : "Sign In"}
          </div>
        </button>
      </form>

      <div className="w-full flex justify-between p-2">
        <div>
          <p>
            Dont have an account?{" "}
            <Link
              className="text-blue-700 hover:text-purple-500"
              to="/register"
            >
              SignUp
            </Link>
          </p>
        </div>
        <div>
          <p>
            <Link
              className="text-blue-700 hover:text-purple-500"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
