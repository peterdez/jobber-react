import React, { useState, useRef } from "react";
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
  const remunerationRef = useRef();
  const basicRef = useRef();

  const triggerRemuneration = () => {
    remunerationRef.current.click();
  };

  const triggerBasic = () => {
    basicRef.current.click();
  };

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
        <div className="mt-4">
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newJob}>
            Add
          </button>
        </div>
      ) : (
        <>
        <div id="add_gig_form" className="gig-form g-3 mb-5 mt-4">
        <div className="d-md-flex align-items-start px-3">
          <div className="nav flex-column nav-pills nav-pills-inner px-4 py-2 pt-md-2 pb-md-4 mb-2 mx-md-4 w-25 bg-white shadow-lg rounded" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <div className="col-md-12">  
          <ul className="nav nav-pills gig-line mb-0">
                      <li className="nav-item mt-4" role="presentation">
                          <button ref={basicRef} type="button" href="#" id="v-pills-basic-tab" data-toggle="pill" data-target="#v-pills-basic" 
                role="tab" aria-controls="v-pills-basic" aria-selected="true" className="nav-link active text-start p-0">Basic Data</button>
                          
                      </li>
      
                      <li className="nav-item mt-4" role="presentation">
                          <button ref={remunerationRef} type="button" href="#" id="v-pills-remuneration-tab"  data-toggle="pill" data-target="#v-pills-remuneration" 
                role="tab" aria-controls="v-pills-remuneration" aria-selected="false" className="nav-link text-start p-0">Remuneration</button>
                          
                      </li>
                  </ul>
          </div>
          </div>
          
          <div className="tab-content w-50  bg-white shadow-lg rounded p-4" id="v-pills-tabContent">
            <div className="tab-pane active" id="v-pills-basic" role="tabpanel" aria-labelledby="v-pills-basic-tab">
             <div className="row g-3">
      
                <div className="col-md-6">
                  <label htmlFor="title" className="form-label">Job Title</label>
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
      
                <div className="col-md-6">
                  <label htmlFor="description" className="form-label">Short Description</label>
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
      
                {/*<div className="col-md-6">
                  <label for="role_id" className="form-label">Role</label>
                  <select className="form-select" name="role_id" aria-label="Default select example">
                      
                    </select>
                </div>*/}

                <div className="col-md-6">
                  <label htmlFor="role" className="form-label">Role</label>
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
      
                {/*<div className="col-md-6">
                  <label for="company_id" className="form-label">Company</label>
                  <select className="form-select" name="company_id" aria-label="Default select example">
                      
                    </select>
                </div>*/}

                <div className="col-md-6">
                  <label htmlFor="company" className="form-label">Company</label>
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
      
                <label for="location" className="form-label">Location</label>
                <div className="col-md-6 mt-0">
                  <select className="form-select" aria-label="country">
                    <option selected>Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
      
                <div className="col-md-6 mt-0">
                  <select className="form-select" aria-label="state">
                    <option selected>State/Region</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
      
                <div className="col-md-12">
                <textarea className="form-control" id="address" rows="2" placeholder="Address"></textarea>
                </div>
      
                <div className="col-md-12">
                <label for="tags" className="form-label">Add tags</label>
                <input type="text" className="form-control" data-role="tagsinput" placeholder="" aria-label="tags"/>
                <p className="text-muted mt-2">Suggested tags: 
                <span className="text-decoration-underline"> full time, contract, freelance</span>
                 </p>
                </div>
      
                <div className="col-md-12">
                <div className="float-end">
                <a href="/jobs" type="button" className="btn">Cancel</a>
                <button className="btn btn-primary" id="continue_btn" data-target="#v-pills-remuneration" type="button" onClick={triggerRemuneration}>Continue</button>
                </div>
                </div>
      
             </div>
             
      
            </div>
            <div className="tab-pane" id="v-pills-remuneration" role="tabpanel" aria-labelledby="v-pills-remuneration-tab">
              <label htmlFor="salary" className="form-label">Salary</label>
              <div className="row g-3">
      
              <div className="col-md-12">
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
      
                <div className="col-md-12">
                  <div className="float-end">
                  <button className="btn" id="gig_create_back" type="button" onClick={triggerBasic}>Back</button>
                  <button onClick={saveJob} className="btn btn-primary">Add Job</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
        
        </>
      )}
    </div>
    </>
  );
};

export default AddJob;