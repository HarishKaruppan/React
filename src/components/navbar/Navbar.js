import "./navbar.css";
import { AiOutlineLeft } from "react-icons/ai";
const Navbar = ({ title }) => {
  return (
    <div className="navbar">
      <div className="icon">
        <AiOutlineLeft />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Navbar;
