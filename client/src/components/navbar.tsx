import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import Icon from "react-crypto-icons";


export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Crypto Market</h1> {/* Webseite name */}
      </div>
      <div className="navbar-links">
        <Link to="/">Trade</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">
        <Icon name="btc" size={25}/>
        </Link>
      </div>
    </div>
  );
};
