import React from "react";
import { getUser, logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Welcome {user.name}</p>

      <button onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default ClientDashboard;
