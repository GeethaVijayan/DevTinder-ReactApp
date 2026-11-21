import  { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {


/**we need to create state for login */

const [emailId, setEmailId] = useState("");
const [password, setPassword] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [error, setError] = useState("");
const [isLoginForm, setIsLoginForm] = useState(true);


/**once login is success we get response of each individual user data *
 * we need to store that respponse in our redux store */

const dispatch = useDispatch();  // we need to dispatch action to store data in redux store 
const navigate = useNavigate(); //I need to navigate to profile page after login success


const handleLogin = async () =>{
  try{
      const res = await axios.post(
  BASE_URL + "/login",
  { email: emailId, password },
  { withCredentials: true }   // third argument, outside the body
);
 console.log(res);
 /**
  * now with the dispatch action we are just passing the response to store user data in action 
  * now in store action addUser will add user with response data and store it in redux store
  */
 dispatch(addUser(res.data));  // dispatching action to store data in redux store
 return navigate("/feed");  // after login we need to navigate to feed page
   }
  catch (err) {
  setError(getErrorMessage(err, "Login failed. Please try again."));
  console.error(err);
}


}

const handleSignup = async () =>{
  try{
      const res = await axios.post(
  BASE_URL + "/signup",
  { email: emailId, password,firstName,lastName },
  { withCredentials: true }   // third argument, outside the body
);
 console.log(res);
 /**
  * now with the dispatch action we are just passing the response to store user data in action 
  * now in store action addUser will add user with response data and store it in redux store
  * noww new user gets added in store 
  */
 dispatch(addUser(res.data.data));  // dispatching action to store data in redux store
 return navigate("/profile");  // after login we need to navigate to profile page
   }
  catch (err) {
    setError(getErrorMessage(err, "Sign up failed. Please try again."));
    console.error(err);
}


}

const getErrorMessage = (err, fallback) => {
  const data = err?.response?.data;
  if (typeof data === "string") return data;
  return data?.message || fallback;
};



  return (
    <div className="flex  justify-center m-10">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{isLoginForm ? "Login":"Sign Up"}</h2>
  {!isLoginForm && (
    <>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text" className="input"
   value = {firstName}
   onChange={(e) => setFirstName(e.target.value)}
  placeholder="" />
</fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">LastName</legend>
  <input type="text" className="input"
   value = {lastName}
   onChange={(e) => setLastName(e.target.value)}
  placeholder="" />
</fieldset>
  </>
  )}



    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="email" className="input"
   value = {emailId}
   onChange={(e) => setEmailId(e.target.value)}
  placeholder="" />
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input"
  value = {password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="" />
</fieldset>
  <p className ="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>
        {isLoginForm ? "Login" :"signUp"}
      </button>
    </div>

<p
  className="cursor-pointer m-auto"
onClick={() => {
  setIsLoginForm((value) => !value);
  setError("");
}}>
  {isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}
</p>
  </div>
</div>
    </div>
  );
};

export default Login;