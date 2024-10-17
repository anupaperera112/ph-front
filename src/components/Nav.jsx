import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { GoogleLogin } from "@react-oauth/google";

const Nav = () => {
  const logOut = () => {
    googleLogout();
  };
  return (
    <header className="w-full py-8 top-0">
      <nav className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Logo" width={30} height={30} />
            <p className="ml-4 text-xl font-bold">MedTrack</p>
          </a>
        </div>

        {location.pathname === "/" && (
          <div className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            <a
              href="#how-to-use"
              className="font-montserrat leading-normal text-lg text-slate-gray"
            >
              How to use
            </a>
            <a
              href="#features"
              className="font-montserrat leading-normal text-lg text-slate-gray"
            >
              Features
            </a>
          </div>
        )}
        {location.pathname === "/" && (
          <Link to="/sign-in">
            <button className="black_btn">Sign In</button>
          </Link>
        )}
        {location.pathname !== "/" && (
            <Link to="/">
              <button className="black_btn" onClick={logOut}>Log Out</button>
            </Link>
        )}

      </nav>
    </header>
  );
};

export default Nav;