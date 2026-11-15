import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";


const NavBar = () => {
  const user = useSelector((state) => state.user); // Accessing user data from Redux store
console.log("navbar user:", user);
const dispatch = useDispatch(); // we need to dispatch action to store data in redux store
const navigate = useNavigate(); 
const handleLogout = async()=>{

  try{
    
    await axios.post(BASE_URL + "/logout", {},{
        withCredentials: true,
  });
  /**in logout we are making cokkies null - clearing cookies  */
  /**one more thing we need to clear the Redux store as well */
  /**we need to daipatch action of removeuser */

  dispatch(removeUser());  // Dispatching action to remove user data from Redux store
  /**as soon as i logout i need to rredirect to login once again */
  return navigate("/login");

  }catch(err){
    console.log(err);
  }
 
}

  return (
    <div className="navbar bg-gray-900 text-white shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          👩‍💻 Dev Tinder
        </Link>
      </div>

     <div className="flex gap-2">
  {user && (
    <div className="flex items-center gap-2 mx-5">
      <p className="px-2">Welcome, {user.firstName}</p>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="User photo" src={user.photoUrl} />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to="/settings">Settings</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default NavBar;