import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useState } from "react";
import { useRef } from 'react';



const UserCard  = ({user}) => {
    console.log(user)
    const dispatch = useDispatch();
    const {_id,firstName, lastName, photoUrl, age,gender,about} = user;

      /** swipe logic: drag the card, past the threshold it counts as interested (right) or ignored (left) */
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const startX = useRef(0);
    const SWIPE_THRESHOLD = 120; // pixels the card must travel to count as a swipe

   
    const handleSendRequest = async(status,userId)=>{
     
     try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+ userId, {},{withCredentials:true})
        console.log(res)
       dispatch(removeUserFromFeed(userId))

     }catch(err){
      console.log(err)
     }

    }

    const swipeAway = (status) => {
      if (leaving) return;
      setLeaving(true);
      setDragX(status === "interested" ? 800 : -800); // fly off the screen
      setTimeout(async () => {
        await handleSendRequest(status, _id);  // same API call + removeUserFromFeed as before
        setDragX(0);                           // reset in case the request failed and the card stays
        setLeaving(false);
      }, 300);
    };

   const onPointerDown = (e) => {
      if (leaving || e.target.closest("button")) return; // let the buttons handle their own clicks
      startX.current = e.clientX;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      setDragX(e.clientX - startX.current);
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      if (dragX > SWIPE_THRESHOLD) swipeAway("interested");
      else if (dragX < -SWIPE_THRESHOLD) swipeAway("ignored");
      else setDragX(0); // not far enough, snap back
    };

    // 0 to 1, used to fade the INTERESTED / IGNORE stamps in as you drag
    const likeOpacity = Math.min(Math.max(dragX, 0) / SWIPE_THRESHOLD, 1);
    const nopeOpacity = Math.min(Math.max(-dragX, 0) / SWIPE_THRESHOLD, 1);

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        transform: `translateX(${dragX}px) rotate(${dragX / 20}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease",
        touchAction: "pan-y", // vertical scroll still works on phones
      }}
      className="group relative w-96 cursor-grab select-none overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl ring-1 ring-white/10 active:cursor-grabbing"
    >
      <figure className="relative h-[28rem] overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName}
          draggable={false}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* stamps that appear while dragging */}
        <div
          style={{ opacity: likeOpacity }}
          className="absolute left-5 top-5 -rotate-12 rounded-lg border-4 border-green-400 px-3 py-1 text-2xl font-extrabold text-green-400"
        >
          INTERESTED
        </div>
        <div
          style={{ opacity: nopeOpacity }}
          className="absolute right-5 top-5 rotate-12 rounded-lg border-4 border-red-400 px-3 py-1 text-2xl font-extrabold text-red-400"
        >
          IGNORE
        </div>

        <div className="absolute bottom-0 w-full p-5">
          <h2 className="text-3xl font-bold">
            {firstName + " " + lastName}
            {age && <span className="ml-2 text-xl font-normal text-white/80">{age}</span>}
          </h2>
          {gender && (
            <span className="mt-2 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs capitalize backdrop-blur">
              {gender}
            </span>
          )}
        </div>
      </figure>

      <div className="p-5">
        <p className="line-clamp-3 min-h-[3.5rem] text-sm text-white/70">{about}</p>

        <div className="mt-5 flex justify-center gap-4">
          <button
            className="btn rounded-full border border-white/20 bg-white/10 px-6 text-white hover:border-red-400 hover:bg-red-500/20"
            onClick={() => swipeAway("ignored")}
          >
            ✕ Ignore
          </button>
          <button
            className="btn rounded-full border-0 bg-gradient-to-r from-pink-500 to-orange-400 px-6 text-white shadow-lg shadow-pink-500/30"
            onClick={() => swipeAway("interested")}
          >
            ♥ Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
