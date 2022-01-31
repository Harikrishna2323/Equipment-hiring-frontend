import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditVehicle from "./pages/EditVehicle";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route exact path="/user-bookings" element={<UserBookings />} />
          <Route exact path="/booking/:id" element={<Booking />} />

          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/edit/:vehicleid" element={<EditVehicle />} />
          <Route exact path="/addcar" element={<AddCar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
