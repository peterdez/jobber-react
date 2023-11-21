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
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Jobs List</h4>

        <ul className="list-group">
          {jobs &&
            jobs.map((job, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveJob(job, index)}
                key={index}
              >
                {job.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllJobs}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <h4>Job</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentJob.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentJob.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentJob.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/jobs/" + currentJob.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;