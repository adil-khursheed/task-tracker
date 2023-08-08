import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", image);

    try {
      const res = await register(myForm).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/verify");
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
            Register
          </h2>
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-center w-full gap-5 mb-6">
            <div className="w-20 h-20 bg-Light-Grayish-Blue rounded-full">
              <img
                src={imagePrev ? imagePrev : "/user.png"}
                alt=""
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full input__bg"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full input__bg"
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
            <label
              htmlFor="avatar"
              className="cursor-pointer w-full border border-Light-Grayish-Blue dark:border-none dark:bg-Very-Light-Gray h-[45px] flex items-center justify-center rounded-[4px] text-Very-Dark-Desaturated-Blue">
              <input
                type="file"
                id="avatar"
                accept="image/png,image/jpg,image/jpeg"
                className="hidden"
                onChange={changeImageHandler}
              />
              Choose image
            </label>
            <button type="submit" className="input__btn">
              Sign up
            </button>
          </form>
          <p className="text-Very-Dark-Grayish-Blue dark:text-Very-Light-Gray text-sm">
            Have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Register;
