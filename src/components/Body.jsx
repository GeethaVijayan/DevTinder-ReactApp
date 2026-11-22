import Footer from "./footer";
import NavBar from "./navBar";
import { Outlet,useNavigate } from "react-router-dom"; 
import {BASE_URL} from '../utils/constants';
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { useEffect} from "react";

import { addUser } from "../utils/userSlice";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //I need to navigate to profile page after login success
 /**5.we are making apii call again and again to avoid these we are managing data in store in frontend 
  *  when request comes frst will checkh if data is present in store or not . if not we will do api call
  */
    const userData = useSelector((store) => store.user);
   


  /**
   * 1. we are fetching user details form profile View Api -after login it gives data with token we are passing
   * 
   */


 const fetchUser = async () => {
  if(userData) return;  // if user data is present in store we will not make api call again and again
      try {
        const user = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        /**
 * 2.we are upddating store with latest fetch details using profile data
 */
        dispatch(addUser(user.data));
      } catch (err) {
        /**4.wwhen it gives error when token is invalid
          when it finds token invalid it needs to navigate too login page that logic is checked in nodejs codea after checking it gives  error 401 */

          if(err.status === 401){
          navigate("/login");
          }
          console.log(err);
      }
    };
  
/*3.useEffect - after updating store we are calling it for initial load
 * i will fetch user when my component is loaded *
 * Once my componnet loaads this will be thee first action to get loaded 
 */ 

   useEffect(() =>{
    /**6. after fetching from store i will user user is present in store or not if its ot  */
    fetchUser();
   }, [])




  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;