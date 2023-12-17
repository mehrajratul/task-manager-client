import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="my-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
