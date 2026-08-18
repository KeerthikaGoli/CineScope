import { Link } from "react-router-dom";
import logo from "../assets/cinescope-logo-2.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={logo}
          alt="CineScope"
          style={{
            width: "170px",
            height: "auto",
            display: "block",
            marginLeft: "-40px",
          }}
        />
      </div>

      <div className="nav-links">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/search" style={{ color: "white", textDecoration: "none" }}>
          Search
        </Link>

        <Link
          to="/watchlist"
          style={{ color: "white", textDecoration: "none" }}
        >
          Watchlist
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;