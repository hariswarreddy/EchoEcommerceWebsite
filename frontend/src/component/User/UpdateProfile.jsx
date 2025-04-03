import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { CgMail } from "react-icons/cg";
import { FaSmile } from "react-icons/fa";
import "./updateProfile.css";
import { toast, Toaster } from "react-hot-toast";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");


  useEffect(() => {
    if (user && user.avatar && user.avatar?.url) {
      setAvatarPreview(user.avatar?.url);  // Ensure avatar is properly fetched
    }
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(
        user.avatar?.url || 
        (typeof user.avatar === "string" && user.avatar) ||"./logo192.png"
      );
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account", { replace: true });

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    if (avatar) {
        myForm.append("avatar", avatar);
    }
    else {
        myForm.append("avatar", user.avatar?.url); // Ensures avatar isn't lost
      }
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(file);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toaster />
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaSmile />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <CgMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
