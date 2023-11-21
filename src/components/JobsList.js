import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveJobs,
  findJobsByTitle,
  deleteAllJobs,
} from "../slices/jobs";
import { Link } from "react-router-dom";

const JobsList = () => {
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const jobs = useSelector(state => state.jobs);
  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveJobs());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentJob(null);
    setCurrentIndex(-1);
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  const removeAllJobs = () => {
    dispatch(deleteAllJobs())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findJobsByTitle({ title: searchTitle }));
  };

  return (
  <>
   {/*<h1 className="h3 mb-4 text-gray-800">Blank Page</h1>*/}
    <div className="d-flex align-items-center justify-content-between py-4 border-bottom px-5">
        <div><h1 className="h1 m-0 fw-bold">Jobs</h1></div>
        <div>
            <Link to={"/add"} className="btn btn-primary">
              Add Job
            </Link>
        </div>
      </div>
      <nav className="nav nav-pills nav-pills-index nav-justified px-5">
        <a className="nav-link rounded-0 text-start ps-0 active" aria-current="page" href="/gigs">All Gigs <span className="badge bg-secondary">8</span></a>
        <a className="nav-link rounded-0" href="/gigs/my-gigs">My Gigs <span className="badge bg-secondary-b">32</span></a>
        <a className="nav-link rounded-0" href="#">Rejected Gigs <span className="badge bg-secondary-b">25</span></a>
      </nav>

    <div className="pb-3 pt-4 below-pills px-5">
        <div className="row row-cols-3 row-cols-lg-6 g-3 no-wrap">
            <div className="col">
                <a className="btn btn-outline-light w-100" href="#" role="button">Freelance</a>
            </div>
            <div className="col">
                <div className="dropdown">
                  <button className="btn btn-outline-light dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Keywords
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
            </div>
            
            <div className="col">
                <a className="btn btn-outline-light w-100" href="#" role="button">Location</a>
            </div>
            <div className="col">
                <a className="btn btn-outline-light w-100" href="#" role="button">Remote friendly</a>
            </div>
            <div className="col">
                    <a className="btn btn-outline-secondary active w-100" href="#" role="button">Design <i className="fa fa-check"></i></a>
            </div>
            <div className="col">
                <a className="btn btn-outline-light w-100" href="#" role="button">Contract</a>
            </div>
        </div>
    </div>
    
      <div className="table-responsive px-5">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th scope="col">Role</th>
              <th scope="col">Company</th>
              <th scope="col">Date</th>
              <th scope="col">Salary</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
          {jobs &&
            jobs.map((job, index) => (
                <tr className={
                    "bg-white rounded mb-2" + (index === currentIndex ? "active" : "")
                }>
                    <td>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id=""/>
            </div>
            </td>
                <td>
                {job.title}
                </td>
                <td>
                {job.role}
                </td>
                <td>
                {job.company}
                </td>
                <td>
                {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td>
                {job.salary ? "₦" + job.salary : ""}
                </td>
                </tr>
                ))}

        
          </tbody>
        </table>
        
      </div>


    

    

        


    </>
  );
};

export default JobsList;