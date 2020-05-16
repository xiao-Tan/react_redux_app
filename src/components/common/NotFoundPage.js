import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <React.Fragment>
      <div className="alert alert-danger">
        <br></br>
        <h1>Error 404: Page Not Found</h1>
      </div>
      <Link to="/" className="btn btn-info">
        Back to Home Page
      </Link>
    </React.Fragment>
  );
}

export default NotFoundPage;
