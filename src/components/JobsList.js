import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveJobs,
  findJobsByTitle,
  deleteAllJobs,
  deleteJob,
} from "../slices/jobs";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const JobsList = () => {
  const currentUser = AuthService.getCurrentUser();
  const initialJobState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const jobs = useSelector(state => state.jobs);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const mockJobs = [
    {id: 1, title: 'Software Engineer', description: 'Developing software', role: 'Manager', company: 'Google', salary: '100000', date: '8/11/2022'},
    {id: 1, title: 'Software Engineer', description: 'Developing software', role: 'Manager', company: 'Google', salary: '100000', date: '8/11/2022'},
    {id: 1, title: 'Software Engineer', description: 'Developing software', role: 'Manager', company: 'Google', salary: '100000', date: '8/11/2022'}
  ];

  const renderedMockJobs = mockJobs &&
            mockJobs.map((job, key) => (
                <tr className="bg-white rounded mb-2" key="job._id">
                    <td>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id=""/>
            </div>
            </td>
                <td>
                <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                </td>
                <td>
                {job.role}
                </td>
                <td>
                {job.company}
                </td>
                <td>
                {job.date}
                </td>
                <td>
                {job.salary ? "₦" + job.salary : ""}
                </td>
                <td>
                  <div class="d-grid gap-2 d-md-block">
                    <button type="button" class="btn btn-primary me-1">Edit</button>
                    <button class="btn btn-secondary-b">Delete</button>
                  </div>
                </td>
                </tr>
                ))
  const orderedJobs = jobs.slice().sort().reverse();
  const renderedJobs = jobs &&
             orderedJobs.map((job, key) => (
                <tr className="bg-white rounded mb-2" key="job._id">
                    <td>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id=""/>
            </div>
            </td>
                <td>
                <Link to={`/jobs/${job._id}`}>{job.title}</Link>
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
                <td>
                  <div class="d-grid gap-2 d-md-block">
                    {/*<Link to={`editJob/${job._id}`} type="button" class="btn btn-primary me-1">Edit</Link>*/}
                    <button class="btn btn-primary me-1" onClick={() => handleEditJobClick(job.id)}>Edit</button>
                    <button class="btn btn-secondary-b" onClick={() => handleDeleteJobClick(job)}>Delete</button>
                  </div>
                </td>
                </tr>
                ))

  const handleAddJobClick = () => {
    if(!currentUser || !currentUser.roles.includes("ROLE_ADMIN")){
      setAlertMessage("You cannot add a job")
    }
    else{
      navigate("/jobs/add")
    }
  }

  const handleEditJobClick = (id) => {
    if(!currentUser || !currentUser.roles.includes("ROLE_ADMIN")){
      setAlertMessage("You cannot edit a job")
    }
    else{
      navigate("/jobs/editJob/:id")
    }
  }

  const handleDeleteJobClick = (job) => {
    if(!currentUser || !currentUser.roles.includes("ROLE_ADMIN")){
      setAlertMessage("You cannot delete a job");
    }
    else{
      removeJob(job)
      //navigate("/jobs/editJob/:id")
    }
  }

  useEffect(() => {
    if(alertMessage){
      setTimeout(() => {
        setAlertMessage(null);
      }, 1000);
    }
  },[alertMessage])

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

  const removeJob = (job) => {
    console.log(job);
    dispatch(deleteJob({ id: job._id }))
      .unwrap()
      .then(() => {
        window.location.reload(true);
        //navigate("/jobs");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
  <>
  {alertMessage ? <p className="alert alert-danger">{alertMessage}</p> : ""}
    <div className="d-flex align-items-center justify-content-between py-4 border-bottom">
        <div><h1 className="h1 m-0 fw-bold">Jobs</h1></div>
        <div>
            <button onClick={handleAddJobClick} className="btn btn-primary">Add Job</button>
        </div>
      </div>
      <nav className="nav nav-pills nav-pills-index nav-justified">
        <a className="nav-link rounded-0 ps-0 active" aria-current="page" href="/jobs">All Jobs <span className="badge bg-secondary">{jobs.length}</span></a>
        <a className="nav-link rounded-0" href="/jobs/my-jobs">My Jobs <span className="badge bg-secondary-b">32</span></a>
        <a className="nav-link rounded-0" href="#">Rejected Jobs <span className="badge bg-secondary-b">25</span></a>
      </nav>

    <div className="pb-3 pt-4 below-pills">
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
    
      <div className="table-responsive">
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
          {renderedJobs.length > 0 ? renderedJobs : renderedMockJobs}
          </tbody>
        </table>
        
      </div>


    

    

        


    </>
  );
};

export default JobsList;