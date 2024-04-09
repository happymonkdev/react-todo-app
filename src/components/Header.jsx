import { NavLink, useNavigate } from "react-router-dom";
import Register from "./Register";
import { isUserLoggedIn, logout } from "../services/AuthService";

const Header = () => {
  const isAuth = isUserLoggedIn();
  const navigator = useNavigate();
  function handleLogout() {
    logout();
    console.log("---log out now");
    navigator("/login");
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="mx-2">
            <a href="http://localhost:3000/" className="navbar-brand ">
              Todo Management App
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <NavLink to="/todos" className="nav-link">
                    {" "}
                    Todos{" "}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {!isAuth && (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    {" "}
                    Register{" "}
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login{" "}
                  </NavLink>
                </li>
              </ul>
            </>
          )}
          {isAuth && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => handleLogout()}
                >
                  {" "}
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </div>
  );
};
export default Header;
