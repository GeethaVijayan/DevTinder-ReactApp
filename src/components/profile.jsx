import {useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const profile = () => {
  /**after login we are seeiing EditProfile in that case we need to prefill data so we need to get 
   * user detaails from store 
   * 1.to read data we need to use selector
   */
   const user = useSelector((store)=>store.user)
   if (!user) return null; // or a loading spinner

  return (
    <div>
      <EditProfile user={user}/>
    </div>
  );
};

export default profile;
