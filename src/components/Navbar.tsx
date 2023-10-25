import { useEffect } from "react";
import { NavbarProps } from "../types";
import { Link, useLocation } from "react-router-dom";
interface navList {
  list: NavbarProps[];
}
const Navbar: React.FC<navList> = ({ list }) => {
  const location = useLocation();

  return (
    <ul className="list">
      <li className="nav-link">
        <Link
          to="/menu"
          style={{ fontWeight: "bold", color: "black", textDecoration: "none" }}
        >
          Menu
        </Link>
      </li>
      ;
      {list.map((elem, index) => {
        return (
          <li
            key={index}
            className={`nav-link ${
              location.pathname.split("/")[1] === elem.title.split(" ").join("")
                ? "main-active"
                : ""
            }`}
          >
            <Link
              to={elem.title.split(" ").join("")}
              className={`no-underline ${
                location.pathname.split("/")[1] ===
                elem.title.split(" ").join("")
                  ? "active"
                  : ""
              }`}
            >
              {elem.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
