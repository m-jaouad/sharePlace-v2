import { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import AuthContext from "../../context/auth-context";
const Navigation = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <nav>
      <ul className={classes.navigation}>
        <li>
          <Link to="/"> PLACES </Link>
        </li>
        <li>
          {auth.isLoggedIn && <Link to="/places/new-place"> NEW PLACE </Link>}
        </li>
        <li>
          {auth.isLoggedIn && <Link to={`/profil/${props.id}`}> PROFIL </Link>}
        </li>
        <li>{!auth.isLoggedIn && <Link to="/auth"> LOGIN </Link>}</li>
      </ul>
    </nav>
  );
};

export default Navigation;
