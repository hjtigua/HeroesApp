import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const action = {
    type: types.login,
    payload: {
      name: "Hector Javier Tigua Guerrero",
    },
  };

  const handleLogin = () => {
    const redirectPath = localStorage.getItem("lastPath") || "/";

    dispatch(action);
    history.replace(redirectPath);
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
