import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../slices/jobs";
import { Link } from "react-router-dom";
const AddJob = () => {
  const initialJobState = {
    id: null,
    title: "",
    description: "",
    role: "",
    company: "",
    salary: "",
    published: false
  };
  const [job, setJob] = useState(initialJobState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const saveJob = () => {
    const { title, description, role, company, salary } = job;

    dispatch(createJob({ title, description, role, company, salary }))
      .unwrap()
      .then(data => {
        console.log(data);
        setJob({
          id: data.id,
          title: data.title,
          description: data.description,
          role: data.role,
          company: data.company,
          salary: data.salary,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newJob = () => {
    setJob(initialJobState);
    setSubmitted(false);
  };

  return (
    <>
    <div className="d-flex align-items-center justify-content-between py-4 border-bottom px-5">
        <div><h1 className="h1 m-0 fw-bold">Add Job</h1></div>
        <div>
            <Link to={"/jobs"} className="btn btn-primary">
              Jobs
            </Link>
        </div>
    </div>
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newJob}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={job.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={job.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              required
              value={job.role || ''}
              onChange={handleInputChange}
              name="role"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              required
              value={job.company || ''}
              onChange={handleInputChange}
              name="company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="salary"
              required
              value={job.salary || ''}
              onChange={handleInputChange}
              name="salary"
            />
          </div>

          <button onClick={saveJob} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default AddJob;