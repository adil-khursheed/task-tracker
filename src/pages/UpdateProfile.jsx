import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";

const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo.user.name);
  const [imagePrev, setImagePrev] = useState(userInfo.user.avatar.url);
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfile] = useUpdateProfileMutation();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("avatar", image);

    // console.log(myForm);

    try {
      const res = await updateProfile(myForm).unwrap();
      dispatch(setCredentials(res));
      navigate("/profile");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="w-full text-center bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue rounded-[4px] py-6 px-10 shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue">
        <h2 className="text-2xl text-Very-Dark-Desaturated-Blue dark:text-Very-Light-Gray mb-6">
          Update Profile
        </h2>
        <form
          onSubmit={updateProfileHandler}
          className="flex flex-col items-center justify-center w-full gap-5 mb-6">
          <div className="w-28 h-28 rounded-full">
            <img
              src={imagePrev ? imagePrev : "/user.png"}
              alt=""
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full input__bg"
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer w-full flex items-center justify-center input__bg">
            <input
              type="file"
              id="avatar"
              accept="image/png,image/jpg,image/jpeg"
              className="hidden"
              onChange={changeImageHandler}
            />
            Choose image
          </label>
          <button type="submit" className="w-full input__btn">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
