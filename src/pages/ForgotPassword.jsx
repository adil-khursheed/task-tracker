import { useState } from "react";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [forgotPassword] = useForgotPasswordMutation();

  const navigate = useNavigate();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      navigate("/resetpassword");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="w-full text-center bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue rounded-[4px] py-6 px-10 shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue">
        <h2 className="text-2xl text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray mb-6">
          Forgot Password
        </h2>
        <form
          onSubmit={forgotPasswordHandler}
          className="flex flex-col w-full gap-5 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="input__bg"
          />
          <button type="submit" className="input__btn">
            Send OTP
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
