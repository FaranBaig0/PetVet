import React from "react";
import { getUser, logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Admin: {user.name}</p>

      <button onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
