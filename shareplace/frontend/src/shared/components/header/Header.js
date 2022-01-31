import classes from "./Header.module.css";
import Navigation from "./Navigation";
const Header = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}> sharePlace </div>
      <div className={classes.navigation}>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
