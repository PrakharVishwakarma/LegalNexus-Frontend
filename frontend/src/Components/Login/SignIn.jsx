import { useForm } from "react-hook-form";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authAtom";
import { loginUser } from "../../utils/authUtils";
import { useFlashMessage } from "../../Hooks/useFlashMessage";

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", data);

      loginUser({ setAuthToken, setIsAuthenticated }, response.data.token);
      showFlash("success", "Login successful!");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      showFlash(message, "error");
      setError("identifier", { type: "manual", message }); // Optional
    }
  };

  return (
    <div id="signinBox" className="shadow-xl rounded-lg hover:shadow-blue-500/60 up-down">
      <p style={{ margin: "0.4rem 0 0.6rem 0", fontSize: "2.2rem", fontWeight: "bold" }}>
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
            {errors.identifier && (
              <p className="text-red-600 text-sm">{errors.identifier.message}</p>
            )}
          </label>
        ) : (
          <label>
            Employee ID:
            <input
              type="text"
              placeholder="Enter Employee Identity Card ID"
              className="shadow-lg focus:shadow-none"
              {...register("identifier", { required: "Employee ID is required" })}
            />
            {errors.identifier && (
              <p className="text-red-600 text-sm">{errors.identifier.message}</p>
            )}
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
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </label>

        <button type="submit" className="p-[3px] relative w-44">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg" />
          <div className="px-8 py-2  bg-blue-500 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Sign In
          </div>
        </button>
      </form>

      <div className="w-full flex justify-between p-2">
        <div>
          <p>
            Dont have an account?{" "}
            <Link className="text-blue-700 hover:text-purple-500" to="/register">
              SignUp
            </Link>
          </p>
        </div>
        <div>
          <p>
            <Link className="text-blue-700 hover:text-purple-500" to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
