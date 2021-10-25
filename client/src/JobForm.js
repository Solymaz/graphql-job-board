import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createJob } from "./requests";

export function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    createJob({ title, description }).then((job) => {
      history.push(`/jobs/${job.id}`);
    });
  }

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
