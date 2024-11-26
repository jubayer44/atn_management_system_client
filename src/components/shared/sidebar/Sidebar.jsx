/* eslint-disable react/prop-types */
import {
  FaBars,
  FaCog,
  FaList,
  FaSignInAlt,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
// import { getUserInfo } from "../../../services/authServices";
import { userRole } from "../../../utils/constant";
import { getUserInfo } from "./../../../services/authServices";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const logout = useLogout();
  const handleLogout = async () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const user = getUserInfo();

  const navColor =
    "flex items-center p-2 space-x-2 rounded hover:text-primary font-[500] hover:bg-white hover:border-l-4 hover:border-primary text-sm";
  const activeNavColor =
    "bg-white text-primary border-l-4 border-primary text-sm";
  return (
    <div className="flex flex-col">
      {/* Hamburger Menu for Mobile */}
      {isOpen ? (
        <button
          onClick={toggleSidebar}
          className="text-tColor fixed z-50 right-3 top-3 md:hidden"
        >
          <ImCross size={20} />
        </button>
      ) : (
        <button
          onClick={toggleSidebar}
          className="text-tColor fixed z-50 right-3 top-3 md:hidden"
        >
          <FaBars size={22} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#f9f3fd] text-tColor w-64 flex flex-col fixed inset-y-0 right-0 md:left-0 transform md:py-3 mt-[52px] md:mt-[56px] rounded-l-lg md:rounded-r-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <nav className="flex-1 p-4 space-y-2">
          {user && user?.role === userRole.user && (
            <NavLink
              to="/my-time-sheet"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${navColor} ${
                  isActive ? activeNavColor : "border-l-4 border-[#f9f3fd]"
                }`
              }
            >
              <FaList />
              <span>My Time Sheet</span>
            </NavLink>
          )}
          {user && user?.role === userRole.admin && (
            <>
              <NavLink
                to="/manage-time-sheet"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${navColor} ${
                    isActive ? activeNavColor : "border-l-4 border-[#f9f3fd]"
                  }`
                }
              >
                <FaCog />
                <span>Manage Time Sheet</span>
              </NavLink>
              <NavLink
                to="/manage-users"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${navColor} ${
                    isActive ? activeNavColor : "border-l-4 border-[#f9f3fd]"
                  }`
                }
              >
                <FaUsers />
                <span>Manage Users</span>
              </NavLink>
            </>
          )}

          <div className="absolute bottom-4 w-full left-0 px-4">
            {user?.email ? (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/profile"
                  className="flex items-center gap-2 mb-4 md:hidden border border-blue-400 p-1 rounded-md"
                >
                  <div className="bg-blue-200 rounded-full">
                    <div className="bg-primary rounded-full flex items-center justify-center w-8 h-8">
                      <span className="text-white font-semibold">
                        {user.name
                          ? user.name.charAt(0).toUpperCase()
                          : user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-tColor font-semibold">
                    {user.name || user.email}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 rounded text-white w-full text-sm gap-2 font-[500] hover:bg-red-700 cursor-pointer bg-red-500"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center p-2 rounded text-gray-100 w-full text-sm gap-2 font-[500] hover:opacity-90 cursor-pointer bg-primary"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
