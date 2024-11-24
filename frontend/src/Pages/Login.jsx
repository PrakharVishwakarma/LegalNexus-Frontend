import SignIn from "../Components/Login/SignIn";

const Login = () => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="hidden lg:block bg-fuchsia-200" id="AuthDesc">

      </div>
      <div className="flex justify-center items-center" id="loginBox">
        <SignIn></SignIn>
      </div>

    </div>
  );
};

export default Login;