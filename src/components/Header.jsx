import { Link, useNavigate } from "react-router-dom";
import { ThemeState } from "../contexts/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { handleThemeSwitch, theme } = ThemeState();

  const handleModal = () => setToggle(!toggle);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <nav className="flex justify-between items-center mb-8">
      <Link to={"/"}>
        <h1 className="font-bold text-4xl tracking-[15px] text-Very-Light-Gray">
          TODO
        </h1>
      </Link>
      <div className="flex items-center gap-5">
        <button onClick={handleThemeSwitch}>
          <img
            src={theme === "dark" ? "/icon-sun.svg" : "/icon-moon.svg"}
            alt=""
            className="w-6"
          />
        </button>
        <div className="relative cursor-pointer" onClick={handleModal}>
          {userInfo && (
            <div className="w-10 h-10 rounded-full">
              <img
                src={userInfo?.user?.avatar?.url}
                alt=""
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
          )}

          {toggle && (
            <div className="absolute w-32 flex flex-col items-center justify-center bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue top-12 -left-[90px] rounded-sm py-3 gap-4 shadow-md shadow-Dark-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Grayish-Blue">
              <Link to={"/profile"} className="hover:text-Bright-Blue">
                Profile
              </Link>
              <button
                className="hover:text-Bright-Blue"
                onClick={logoutHandler}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
