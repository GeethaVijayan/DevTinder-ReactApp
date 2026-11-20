import { useEffect} from "react";
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";


const Connections = () => {
    const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async() =>{
     try{
         const connectionRequest = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        console.log(connectionRequest,'showConnections')
        dispatch(addConnections(connectionRequest.data.data));
     }catch(err){
         console.log(err)
     }
  }

 useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null; // still loading

  if (connections.length === 0)
    return <h1 className="text-center my-10">No connections found</h1>;


  return (
   <div className="my-10">
      <h1 className="text-center text-2xl font-bold">Connections</h1>
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex items-center gap-4 m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
        >
          <img
            alt="photo"
            className="w-16 h-16 rounded-full object-cover"
            src={connection.photoUrl}
          />
          <div>
            <h2 className="font-bold">
              {connection.firstName} {connection.lastName}
            </h2>
            {connection.age && connection.gender && (
              <p>{connection.age}, {connection.gender}</p>
            )}
            <p>{connection.about}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Connections
