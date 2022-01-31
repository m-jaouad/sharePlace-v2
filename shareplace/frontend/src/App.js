import Header from "./bootstrap-test/Header";
import Profile from "./users/pages/Profile";
import { Route, Switch } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import AuthContext from "./shared/context/auth-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Test from "./bootstrap-test/Test";
import Login from "./bootstrap-test/Login";
import PlacesPages from "./bootstrap-test/PlacesPage";
import NewPlace from "./bootstrap-test/NewPlace";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToekn] = useState(null);
  const [userId, setUserId] = useState(null);

  let routes;

  const login = useCallback((token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToekn(token);
    setUserId(userId);
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    setToekn(token);
    if (token) {
      setIsLoggedIn(true);
    }
    if (userId) {
      setUserId(userId);
    }
  }, [login]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToekn(null);
    setIsLoggedIn(false);
  };

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <PlacesPages />
        </Route>
        <Route path="/profil/:id">
          <Profile />
        </Route>
        <Route path="/places/new-place">
          <NewPlace />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <PlacesPages />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        {/* <Route path="/">
          <Redirect to="/auth" />
        </Route> */}
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        token: token,
        userId: userId,
      }}
    >
      <Header />
      <main>{routes}</main>
    </AuthContext.Provider>
  );
};

export default App;
