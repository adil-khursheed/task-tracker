import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="w-full text-center bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue rounded-[4px] py-6 px-10 shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray mb-6">
            Login
          </h2>
          <form
            onSubmit={loginHandler}
            className="flex flex-col w-full gap-5 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="input__bg"
            />
            <div className="w-full flex items-center input__bg">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border-none outline-none bg-transparent flex-grow"
              />
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <button type="submit" className="input__btn">
              Sign In
            </button>
          </form>

          <div className="flex justify-between items-center text-sm">
            <p className="text-Very-Dark-Grayish-Blue dark:text-Very-Light-Gray">
              Not registered?{" "}
              <Link to={"/register"} className="underline">
                Sign up
              </Link>
            </p>
            <p className="text-Very-Dark-Grayish-Blue dark:text-Very-Light-Gray">
              <Link to={"/forgotpassword"} className="underline">
                Forgot Password
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
