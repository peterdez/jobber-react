import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateJob, deleteJob } from "../slices/jobs";
import JobDataService from "../services/JobService";

const Job = (props) => {
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
    dispatch(updateJob({ id: currentJob.id, data: currentJob }))
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
    <div>
      {currentJob ? (
        <div className="edit-form">
          <h4>Job</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentJob.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentJob.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentJob.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentJob.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeJob}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Job...</p>
        </div>
      )}
    </div>
  );
};

export default Job;