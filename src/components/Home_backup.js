import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveJobs,
  findJobsByTitle,
  deleteAllJobs,
  deleteJob,
} from "../slices/jobs";
import "../home.css"

export default function Home () {
  const [currentUser, setCurrentUser] = useState(undefined);
  const jobs = useSelector(state => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const initFetch = useCallback(() => {
    dispatch(retrieveJobs());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const logOut = () => {
    AuthService.logout();
  };

  const homeOrderedJobs = jobs.slice().sort().reverse();
  const homeRenderedJobs = jobs &&
             homeOrderedJobs.map((job, key) => (
              <div className="media text-muted pt-3">
      <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>

      <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark"><Link to={`/jobs/${job._id}`}>{job.title}</Link></strong>
        {job.company}<br></br>
        {job.description}<br></br>
        {job.role}<br></br>
        {new Date(job.createdAt).toLocaleDateString()}<br></br>
        {job.salary ? "₦" + job.salary : ""}
      </p>
    </div>
                ))

    return (
      <>
      <div className="">
  
  <nav className="navbar navbar-expand-lg navbar-light p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
    {currentUser ? (
             <>
             <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
              </li>
              
            
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
            
              </>
        ) : (
          <>
              <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
              </li>
           
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
              </li>
              </>
        )}
    </ul>
  </div>
</nav>
  
  </div>
 
 <div className="container">
  <main role="main" className="inner cover">
  <section className="jumbotron text-center">
    <div className="container">
      <h1>Welcome To Jobber</h1>
      <p className="lead text-muted">MERN Stack Job Board Administrator dashboard built with React and NodeJs</p>
      <p>
      <Link to="/login" className="btn btn-primary my-2">Log in</Link>
      </p>
    </div>
  </section>
  <section>
  <div className="my-3 p-3 bg-white rounded shadow-sm">
    <h6 className="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
    {homeRenderedJobs}
    <small className="d-block text-right mt-3">
      <a href="#">All updates</a>
    </small>
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