import React, { useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./Login.module.css";
import loginContext from "../store/login-context";

const Login = () => {
  const [loginAccount, setCreateAccount] = useState(true);
  const history = useHistory();
  const loginCtx = useContext(loginContext);
  const email = useRef();
  const password = useRef();

  const createAccountHandler = () => {
    setCreateAccount((previousState) => {
      return !previousState;
    });
  };
  const loginHandler = async (event) => {
    event.preventDefault();

    let url;
    if (loginAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDK7XPdIBI8URPn_ZxwE8FsBy-lmtQPEZg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDK7XPdIBI8URPn_ZxwE8FsBy-lmtQPEZg";
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log(history);
        history.replace("/product");
        const data = await res.json();
        const convertedData = JSON.stringify(data);
        localStorage.setItem("tokenId", convertedData);
        loginCtx.login(data);
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.login}>
      <h1>SaleKart</h1>
      <form className={classes.form} onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={email} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={password} />
        <div>
          <button type="submit">
            {loginAccount ? "Login" : "Create Account"}
          </button>
        </div>
        <p onClick={createAccountHandler}>
          {loginAccount
            ? "Create a new Account"
            : "Login with existing account"}
        </p>
      </form>
    </div>
  );
};

export default Login;
