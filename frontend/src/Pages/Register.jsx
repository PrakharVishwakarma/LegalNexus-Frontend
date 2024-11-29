import SignUpform from "../Components/Register/SignUpform";

const Register = () => {

  return (<div className="grid grid-cols-1 lg:grid-cols-2 h-screen">

    <div id="registerBox">
      <SignUpform></SignUpform>
    </div>
    <div className="hidden lg:block bg-fuchsia-200">
        
    </div>
  </div>
  );
};

export default Register;