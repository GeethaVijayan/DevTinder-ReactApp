import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requestReceived = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requestReceived) return null;

  if (requestReceived.length === 0)
    return <h1 className="text-center my-10">No requests found</h1>;

  return (
    <div className="my-10">
      <h1 className="text-center text-2xl font-bold">Requests Received</h1>
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
            <div className="flex gap-2 ml-auto">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;