import React, { useState } from "react";

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newApplication = Object.fromEntries(formData.entries());
    newApplication.id = Date.now();
    newApplication.status = "Pending";
    newApplication.appliedDate = new Date().toISOString().slice(0, 10);
    setApplications([newApplication, ...applications]);
    e.target.reset();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Job Application</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input name="name" placeholder="Full Name" required className="p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required className="p-2 border rounded" />
        <input name="phone" placeholder="Phone Number" className="p-2 border rounded" />
        <input name="position" placeholder="Position Applied For" required className="p-2 border rounded" />
        <input name="linkedin" placeholder="LinkedIn URL" className="p-2 border rounded" />
        <input name="portfolio" placeholder="Portfolio URL" className="p-2 border rounded" />
        <input name="resume" placeholder="Resume URL" required className="p-2 border rounded" />
        <input name="coverLetter" placeholder="Cover Letter URL (optional)" className="p-2 border rounded" />
        <input name="location" placeholder="Location" className="p-2 border rounded" />
        <input name="education" placeholder="Education" className="p-2 border rounded" />
        <input name="experience" placeholder="Experience" className="p-2 border rounded" />
        <input name="skills" placeholder="Skills (comma separated)" className="p-2 border rounded" />
        <input name="expectedSalary" placeholder="Expected Salary" className="p-2 border rounded" />
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Application</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Applications List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">LinkedIn</th>
              <th className="border p-2">Portfolio</th>
              <th className="border p-2">Resume</th>
              <th className="border p-2">Cover Letter</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Education</th>
              <th className="border p-2">Experience</th>
              <th className="border p-2">Skills</th>
              <th className="border p-2">Expected Salary</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border">
                <td className="border p-2">{app.name}</td>
                <td className="border p-2">{app.email}</td>
                <td className="border p-2">{app.phone}</td>
                <td className="border p-2">{app.position}</td>
                <td className="border p-2"><a href={app.linkedin} target="_blank" className="text-blue-600">Link</a></td>
                <td className="border p-2"><a href={app.portfolio} target="_blank" className="text-blue-600">Link</a></td>
                <td className="border p-2"><a href={app.resume} target="_blank" className="text-blue-600">Resume</a></td>
                <td className="border p-2"><a href={app.coverLetter} target="_blank" className="text-blue-600">Letter</a></td>
                <td className="border p-2">{app.location}</td>
                <td className="border p-2">{app.education}</td>
                <td className="border p-2">{app.experience}</td>
                <td className="border p-2">{app.skills}</td>
                <td className="border p-2">{app.expectedSalary}</td>
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">{app.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
