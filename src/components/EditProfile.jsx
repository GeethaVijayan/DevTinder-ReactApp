import { useState } from "react";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setlastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true },
      );
      // update the store only after a successful save
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || err.message);
    }
  };
  return (
    <div className="flex  justify-center my-10">
      <div className="flex  justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name:</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=""
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name:</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                placeholder=""
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age:</legend>
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder=""
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About:</legend>
              <textarea
                className="textarea textarea-ghost"
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>
            <fieldset className="fieldset">
            <select
  className="select"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option value="">Select gender</option>
  <option value="male">male</option>
  <option value="female">female</option>
  <option value="others">others</option>
</select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">PhotoUrl:</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder=""
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
