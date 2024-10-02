import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../loadingError/Toast";
import Message from "./../loadingError/Error";
import Loading from "./../loadingError/Loading";
import { toast } from "react-toastify";
import {
  getUserDetails,
  updateUserProfile,
} from "./../../redux/actions/UserActions";
import "react-toastify/dist/ReactToastify.css";

const ContainerStyled = styled.div``;

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;
  const toastObject = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const submitHandle = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match", toastObject);
    } else {
      toast.success("Profile Updated", toastObject);
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [dispatch, user]);

  return (
    <div>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form
        onSubmit={(e) => submitHandle(e)}
        className="border-2 border-indigo-600 m-2 p-2"
      >
        <div>
          <label>User Name</label>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email Address</label>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileTabs;
