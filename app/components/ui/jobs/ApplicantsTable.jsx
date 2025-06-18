const ApplicantsTable = ({ applicants }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Resume</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant) => (
          <tr key={applicant.id}>
            <td>{applicant.name}</td>
            <td>{applicant.email}</td>
            <td>{applicant.phone}</td>
            <td>
              <a
                href={applicant.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicantsTable;
