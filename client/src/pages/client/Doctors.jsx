import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:6969/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  return (
    <div className="doctors-page">
      <h1>Our Veterinarians</h1>

      <div className="doctor-grid">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <img
              src={doc.image || "/doctor-placeholder.jpg"}
              alt={doc.name}
            />
            <h3>{doc.name}</h3>
            <p>{doc.specialization}</p>
            <span>{doc.experience} years experience</span>
            <button>Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
