import SignIn from "../Components/Login/SignIn";

import SignInLN from '../assets/SignInLN.png'

import Navbar from "../Components/LandingPg/Navbar";


const Login = () => {

  return (<div>

    <Navbar></Navbar>
    <div style={{ height: '50rem' }}>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

        <div className="hidden lg:block bg-fuchsia-200" id="AuthDesc">
          <div className="w-full h-full flex justify-center items-center">
            
            <div className="w-9/12 h-10/12 overflow-hidden">
              <img src={SignInLN} alt="SignIn Graphics" className="w-full h-full object-contain" />
            </div>

          </div>
        </div>

        <div className="flex justify-center items-center" id="loginBox">
          <SignIn></SignIn>
        </div>

      </div>
    </div>
  </div>);
};

export default Login;