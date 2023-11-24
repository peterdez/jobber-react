import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { updateJob, deleteJob } from "../slices/jobs";
import JobDataService from "../services/JobService";

export default function EditJob() {
    const { id }= useParams();
  let navigate = useNavigate();

  const initialJobState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");
  const remunerationRef = useRef();
  const basicRef = useRef();

  const triggerRemuneration = () => {
    remunerationRef.current.click();
  };

  const triggerBasic = () => {
    basicRef.current.click();
  };

  const dispatch = useDispatch();

  const getJob = id => {
    JobDataService.get(id)
      .then(response => {
        setCurrentJob(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getJob(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentJob.id,
      title: currentJob.title,
      description: currentJob.description,
      published: status
    };

    dispatch(updateJob({ id: currentJob.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentJob({ ...currentJob, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateJob({ id: currentJob._id, data: currentJob }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The job was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeJob = () => {
    dispatch(deleteJob({ id: currentJob.id }))
      .unwrap()
      .then(() => {
        navigate("/jobs");
      })
      .catch(e => {
        console.log(e);
      });
  };
    return (
        <>
        <div className="d-flex align-items-center justify-content-between py-4 border-bottom px-5">
        <div><h1 className="h1 m-0 fw-bold">Edit Job</h1></div>
        <div>
            <Link to={"/add"} className="btn btn-primary">
              Add Job
            </Link>
        </div>
      </div>
      <p className={message ? "alert alert-success mt-4" : ""}>{message}</p>
      <div id="edit_gig_form" className="gig-form g-3 mb-5 mt-4">
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
                  <label for="title" className="form-label">Gig Title</label>
                  <input type="text" name="title" id="title" className="form-control" onChange={handleInputChange} value={currentJob.title}/>
                </div>
      
                <div className="col-md-6">
                  <label for="description" className="form-label">Short Description</label>
                  <input type="text" name="description" id="description" className="form-control" onChange={handleInputChange} value={currentJob.description}/>
                </div>
      
                <div className="col-md-6">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select value={currentJob.role} className="form-select" name="role" onChange={handleInputChange}>
                  <option value="Technology">Technology</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    </select>
                </div>
      
                <div className="col-md-6">
                  <label htmlFor="company" className="form-label">Company</label>
                  <select value={currentJob.company} className="form-select" name="company" onChange={handleInputChange}>
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Tesla">Tesla</option>
                    </select>
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
                  <span className="text-decoration-underline">full time</span> 
                <span className="text-decoration-underline">contract</span>  
                <span className="text-decoration-underline">freelance</span>
                 </p>
                </div>
      
                <div className="col-md-12">
                <div className="float-end">
                <a href="/jobs" type="button" className="btn">Cancel</a>
                <button className="btn btn-primary" id="continue_btn" type="button" onClick={triggerRemuneration}>Continue</button>
                </div>
                </div>
      
             </div>
             
      
            </div>
            <div className="tab-pane" id="v-pills-remuneration" role="tabpanel" aria-labelledby="v-pills-remuneration-tab">
              <label for="salary" className="form-label">Salary</label>
              <div className="row g-3">
      
              <div className="col-md-12">
                 <input type="text" name="salary" id="salary" className="form-control" onChange={handleInputChange} value={currentJob.salary}/>
                
                </div>
      
                <div className="col-md-12">
                  <div className="float-end">
                  <button className="btn" id="gig_create_back" type="button" onClick={triggerBasic}>Back</button>
                  <button type="submit" className="btn btn-primary" onClick={updateContent}>Update Job</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}

