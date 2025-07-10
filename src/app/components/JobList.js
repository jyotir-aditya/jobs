"use client";
import { useState, useEffect } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const sampleJobs = [
      {
        Job_ID: 1,
        Job_Title: "Assistant Section Officer",
        Department: "Ministry of Home Affairs",
        Location: "New Delhi",
        Qualification: "Bachelor's Degree",
        Last_Apply_Date: "2025-07-15",
        Salary_Range: "₹44,900 – ₹1,42,400",
        Job_Type: "Permanent",
        Official_URL: "https://www.mha.gov.in",
      },
      {
        Job_ID: 2,
        Job_Title: "Junior Engineer (Civil)",
        Department: "CPWD",
        Location: "Bengaluru",
        Qualification: "Diploma in Civil Engineering",
        Last_Apply_Date: "2025-07-10",
        Salary_Range: "₹35,400 – ₹1,12,400",
        Job_Type: "Permanent",
        Official_URL: "https://cpwdpims.nic.in/cems/",
      },
    ];
    setJobs(sampleJobs);
  }, []);

  return (
    <div className="container bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Available Government Jobs
      </h2>
      {jobs.map((job) => (
        <div
          key={job.Job_ID}
          className="job-card bg-gray-50 p-4 mb-4 rounded shadow hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-2">{job.Job_Title}</h3>
          <p className="text-gray-700 mb-1">
            <strong>Department:</strong> {job.Department}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Location:</strong> {job.Location}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Qualification:</strong> {job.Qualification}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Last Date:</strong> {job.Last_Apply_Date}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Salary:</strong> {job.Salary_Range}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Job Type:</strong> {job.Job_Type}
          </p>
          {job.Official_URL && job.Official_URL !== "N/A" && (
            <a
              href={job.Official_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-blue-500 hover:underline"
            >
              Apply Now
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;
