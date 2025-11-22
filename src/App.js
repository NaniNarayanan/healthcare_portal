
import './App.css';
import ProfileInformation from './component/profileInformation';
import BreadCrumbs from './reusecomponent/BreadCrump';

function App() {
  return (
    <>
      <div
        style={{ marginTop: { xs: "0px", sm: "17px" }, marginBottom: "25px" }}
      >
        {/* <BreadCrumbs
          crumbs={["Dashboard", "Manage Users"]}
          paths={["/dashboard", "/manageusers"]}
        /> */}

        
      </div>

      <div>
        <h5>Profile Information</h5>
        <ProfileInformation/>
      </div>
    </>
  );
  
}

export default App;
