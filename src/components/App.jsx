import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Body from "./Body";
import Login from "./login";
import Profile from "./profile";
import Feed from "./feed";
import Connections from "./connections";


function App() {
  return (
    <Provider store={appStore}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/connections-sent" element={<Connections/>} />
        <Route path="/request-received" element={<Request />} />
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
  );
}

export default App;