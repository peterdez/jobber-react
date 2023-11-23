import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import JobDataService from "../services/JobService";

export const SingleJobPage = () => {
  const { id } = useParams();
  const initialJobState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
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

  /*const job = useSelector(state =>
    state.jobs.find(job => job._id === jobId)
  )*/

  if (!currentJob) {
    return (
      <section>
        <h2>Job not found!</h2>
      </section>
    )
  }

  return (
    <>
    <div className="d-flex align-items-center justify-content-between py-4 border-bottom px-5">
        <div><h1 className="h1 m-0 fw-bold">{currentJob.title}</h1></div>
        <div>
            <Link to={"/add"} className="btn btn-primary">
            Add Job
            </Link>
        </div>
      </div>
    <section>
      <article className="job">
        <h2></h2>
        <p className="job-content">{currentJob.description}</p>
      </article>
    </section>
    </>
  )
}