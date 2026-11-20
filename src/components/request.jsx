import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch,useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Request = () => {
    /**to read data from store  */
      const requestReceived = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const fetchRequest = async ()=>{
         try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true} );
            console.log(res,'received');
             dispatch(addRequest(res.data.data)); //after getting data immediate next step is to store locally 
              //dispatching addRequest to add requested data received 
         }catch(err){
            //handle err
            console.log(err);
         }
    }

 useEffect(() => { //to call frst in app (when page loads)
    fetchRequest();
  }, []);

 if (!requestReceived) return null; // still loading

  if (requestReceived.length === 0)
    return <h1 className="text-center my-10">No requests found</h1>;


  return (
  <div className="my-10">
      <h1 className="text-center text-2xl font-bold">Connections</h1>
   {requestReceived.map((request) => {
  const { firstName, lastName, photoUrl, age, gender, about } =
    request.fromUserId;
  return (
    <div
      key={request._id}
      className="flex items-center gap-4 m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
    >
      <img
        alt="photo"
        className="w-16 h-16 rounded-full object-cover"
        src={photoUrl}
      />
      <div>
        <h2 className="font-bold">
          {firstName} {lastName}
        </h2>
        {age && gender && <p>{age}, {gender}</p>}
        <p>{about}</p>
      </div>
      <button className="btn btn-primary">Reject</button>
<button className="btn btn-secondary">Accept</button>
    </div>
  );
})}
    </div>
  )
}

export default Request
