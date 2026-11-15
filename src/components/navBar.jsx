import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user); // Accessing user data from Redux store
console.log("navbar user:", user);
  return (
    <div className="navbar bg-gray-900 text-white shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          👩‍💻 Dev Tinder
        </Link>
      </div>

      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center gap-2">
            <p className="px-4">Welcome, {user.lastName}</p>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User photo"
                src={user?.photoUrl}
              />
            </div>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={() => {/* logout logic */}}>Logout</button>
            </li>
          </ul>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default NavBar;