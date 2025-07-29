// /frontend/src/Pages/Home.jsx

import Navbar from "../Components/LandingPg/Navbar";

import Headsection from "../Components/LandingPg/Headsection";
import Footer from "../Components/LandingPg/Footer";
import Newsletter from "../Components/LandingPg/Newsletter";
import OurServe from "../Components/LandingPg/OurServe";

const Home = () => {

  return (
    <div>
      <Navbar></Navbar>
      <Headsection></Headsection> 
      <Newsletter></Newsletter>  
      <OurServe></OurServe>
      <Footer></Footer>
    </div>
  );
};

export default Home;