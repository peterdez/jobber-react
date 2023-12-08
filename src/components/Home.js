import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../home.css"
import Login from "./Login";

export default function Home () {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

    return (
      <>
 
 <div className="container my-5">
  <main role="main" className="inner cover">
  <section className="jumbotron text-center">
    <div className="container">
      <h1>Welcome To Jobber</h1>
      <p className="lead text-muted">A MERN Stack Job Board Administrator dashboard built with React and NodeJs</p>
      <p>
      {currentUser ? (
      <>
      <div className="w-25 m-auto">
      <button className="btn btn-primary btn-lg btn-block my-2" onClick={logOut}>Log out</button>
      <Link to="jobs" className="d-block btn btn-secondary btn-lg btn-block mt-2">Jobs</Link>
      </div>
      </>
      )
    :
    (
      <div className="w-25 ml-auto mr-auto">
      <Link to={"/login"} className="btn btn-primary btn-lg btn-block mb-2">
                Login
              </Link>
              
              <Link to={"/register"} className="btn btn-secondary btn-lg btn-block mt-2">
                Sign Up
              </Link>
              
      </div>
    )}
      </p>
    </div>
  </section>
  </main>
  </div>

<div className="container">
  <footer className="mastfoot mt-5">
    <div className="inner">
      
    </div>
  </footer>
      </div>
      </>
    );
}