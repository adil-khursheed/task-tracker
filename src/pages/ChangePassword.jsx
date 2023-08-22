import { useState } from "react";
import { useChangePasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [changePassword] = useChangePasswordMutation();

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      setOldPassword("");
      setNewPassword("");
      toast.success("Password changed successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="w-full text-center bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue rounded-[4px] py-6 px-10 shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue">
        <h2 className="text-2xl text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray mb-6">
          Change Password
        </h2>
        <form
          onSubmit={changePasswordHandler}
          className="flex flex-col w-full gap-5 mb-6">
          <input
            type="text"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="input__bg"
          />
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="input__bg"
          />
          <button type="submit" className="w-full input__btn">
            Change
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
