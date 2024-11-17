/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetMyProfileQuery } from "../../redux/features/user/userApi";

const Navbar = ({ setIsOpen }) => {
  const { data: userData } = useGetMyProfileQuery();

  const user = userData?.data || null;

  return (
    <div className="text-tColor p-3 fixed top-0 w-full z-50 text-center flex justify-between items-center bg-gradient-to-t from-[#d8eae8] to-[#d8eae8] rounded-t-lg md:min-h-[56px]">
      <div className="text-center text-xl font-bold">
        <Link onClick={() => setIsOpen(false)} to="/" className="md:ml-[64px]">
          ATN
        </Link>
      </div>
      <h1 className="hidden md:flex text-lg font-bold ">
        ATN Management System
      </h1>
      <div>
        {user?.email ? (
          <Link
            to="/profile"
            className="hidden md:flex items-center justify-end gap-2 lg:mr-10 relative cursor-pointer hover:text-blue-500"
          >
            <span className="text-sm font-semibold">
              {user.name || user.email}
            </span>
            <div className="bg-primary rounded-full flex items-center justify-center w-8 h-8">
              <span className="text-white font-semibold">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </span>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
