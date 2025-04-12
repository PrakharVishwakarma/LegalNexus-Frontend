import NavBarDash from "../Components/Dashboard/NavBarDash";
import FlashMessage from "../Components/common/FlashMessage";


const Dashboard = () => {
  return (<div style={{backgroundColor:'lavender', minHeight:'100vh'}}>
      <FlashMessage/>
      <NavBarDash />
  </div>
  );
};

export default Dashboard;
