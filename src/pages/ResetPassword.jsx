import { useState } from "react";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ otp, newPassword }).unwrap();
      navigate("/login");
      toast.success("Password changed successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="w-full text-center bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue rounded-[4px] py-6 px-10 shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray mb-6">
              Reset Password
            </h2>
            <form
              onSubmit={resetPasswordHandler}
              className="flex flex-col w-full gap-5 mb-6">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="input__bg"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="input__bg"
              />
              <button type="submit" className="w-full input__btn">
                Reset Password
              </button>
            </form>
            <div className="p-3 text-sm text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray ">
              <p>
                OTP has been sent to your email. If not received in inbox,
                please check your spam folder.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
