//import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .cathch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="review">Reviews</Link>
      </li>
      {user?.email ? (
        <>
          <li>
            <a onClick={handleLogOut}>Log Out</a>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-blue-400 text-black w-full z-10 max-w-screen-xl font-bold ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-200 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <button className="btn btn-outline normal-case text-xl text-black">
            <Link to={"/"}>Task Manager</Link>
          </button>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
