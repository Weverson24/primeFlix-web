import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <Link className="logo" to="/">
        Logo
      </Link>
      <Link to="/favoritos">Favoritos</Link>
    </div>
  );
}
