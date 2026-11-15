import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Body from "./Body";
import Login from "./login";
import Profile from "./profile";
import Feed from "./feed";


function App() {
  return (
    <Provider store={appStore}>
       <BrowserRouter>
      <Routes>
       <Route path="/" element={<Body />}>
     <Route path="/login" element={<Login />} />
     <Route path="/profile" element={<Profile />} />
    <Route path="/" element={<Feed />} />
   </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
   
  );
}

export default App;