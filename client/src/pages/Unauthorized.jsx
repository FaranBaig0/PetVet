import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>

      <Link to="/" style={styles.link}>
        Go to Login
      </Link>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    color: "#e5e7eb",
  },
  link: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#38bdf8",
    color: "#020617",
    textDecoration: "none",
    borderRadius: "6px",
  },
};

export default Unauthorized;
