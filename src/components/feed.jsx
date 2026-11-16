
import axios from "axios";
import {BASE_URL} from '../utils/constants';
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect} from "react";
import UserCard from "./userCard";



const Feed = () => {
    
 /**1.we get api response and add the response in store using dispatch now we can read the data also using useSeelctor hook */

     const feed = useSelector((state) => state.feed); // Accessing feed data from Redux store
   
     const dispatch = useDispatch();

 const getFeed = async()=>{
   
   /**check if feed is already there or not if feed is already present in store no need for appi call*/
   if(feed) return; 
    try {
      const feedData = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    /**once i get the feed I need to add it to store .
     * for add FeedSlice we need to add it in addFeed so we need tto create new slice
     */
    console.log(feedData.data, 'feed data');
    dispatch(addFeed(feedData.data));  // Dispatching action to add feed data to Redux store
    /**Through dispatch i'm adding data to the store and for  */
    } catch (err) {
      console.error(err);
    }
 }

 useEffect(() => {
  getFeed();
}, []);

if (!feed) return null;

if (feed.length === 0) {
  return <h1 className="text-center my-10">No new users found</h1>;
}

return (
  <div className="flex justify-center my-10">
    <UserCard user={feed[0]} />
  </div>
);
};

export default Feed;
