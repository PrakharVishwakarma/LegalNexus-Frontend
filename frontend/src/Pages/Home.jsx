import Navbar from "../Components/LandingPg/Navbar";

import Headsection from "../Components/LandingPg/Headsection";
import Footer from "./Footer";
import Newsletter from "./Newsletter";

const Home = () => {

  return (
    <div>
      <Navbar></Navbar>
      <Headsection></Headsection> 
      <Newsletter></Newsletter>  
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;