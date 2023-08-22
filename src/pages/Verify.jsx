import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useVerifyMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const Verify = () => {
  const [otp, setOTP] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verify, { isLoading }] = useVerifyMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ otp }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Account verified successfully!");
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
            Verify Your Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-5 mb-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP"
              className="w-full input__bg"
            />
            <button
              type="submit"
              className="w-full bg-Bright-Blue h-[45px] rounded-[4px] text-Very-Light-Gray text-base">
              Verify
            </button>
          </form>
          <div className="p-3 text-sm text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray ">
            {userInfo && <p>{userInfo?.message}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;
