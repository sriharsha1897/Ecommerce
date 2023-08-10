import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import cartContext from "../store/cart-Context";
import loginContext from "../store/login-context";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  const loginCtx = useContext(loginContext);
  const cartCtx = useContext(cartContext);

  const logoutHandler = () => {
    loginCtx.logout();
    cartCtx.logoutCartHandler();
  };
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/product">
                PRODUCT
              </NavLink>
            </li>
            {!loginCtx.isloggedIn && (
              <li className={classes.login}>
                <NavLink activeClassName={classes.active} to="/login">
                  LOGIN
                </NavLink>
              </li>
            )}
            {loginCtx.isloggedIn && (
              <li className={classes.logout} onClick={logoutHandler}>
                <NavLink activeClassName={classes.active} to="/login">
                  LOGOUT
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div>
          <HeaderCartButton />
        </div>
      </header>
    </>
  );
};

export default Header;
