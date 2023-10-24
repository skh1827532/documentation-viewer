import { useEffect } from "react";
import { NavbarProps } from "../types";
import { Link, useLocation } from "react-router-dom";
interface navList {
  list: NavbarProps[];
}
const Navbar: React.FC<navList> = ({ list }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <ul className="list">
      <li className="nav-link">
        <Link to="/">Menu</Link>
      </li>
      ;
      {list.map((elem, index) => {
        return (
          <li key={index} className="nav-link">
            <Link
              to={elem.title.split(" ").join("")}
              style={{
                fontWeight:
                  location.pathname.split("/")[1] ===
                  elem.title.split(" ").join("")
                    ? "bold"
                    : "normal",
                fontStyle:
                  location.pathname.split("/")[1] ===
                  elem.title.split(" ").join("")
                    ? "italic"
                    : "normal",
              }}
              className="no-underline"
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
