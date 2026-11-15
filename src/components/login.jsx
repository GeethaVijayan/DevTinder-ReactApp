import  { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {


/**we need to create state for login */

const [emailId, setEmailId] = useState("jasonsanjay@gmail.com");
const [password, setPassword] = useState("Test@123");
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
 return navigate("/");  // after login we need to navigate to profile page
   }
   catch(error){
    console.error(error)
   }


}


  return (
    <div className="flex  justify-center m-10">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="text" className="input"
   value = {emailId}
   onChange={(e) => setEmailId(e.target.value)}
  placeholder="Type here" />
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input"
  value = {password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Type here" />
</fieldset>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Login;