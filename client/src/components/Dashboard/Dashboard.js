import React from "react";
import Navbar from "../Navbar/Navbar";
import StudyMaterialList from "../StudyMaterialList/StudyMaterialList";

function Dashboard() {
  return (
    <div>
      <div className="dashboard_navbar">
        <Navbar pageName="dashboard" />
      </div>
      <div className="dashboard_study-material-list">
        <StudyMaterialList />
      </div>
    </div>
  );
}

export default Dashboard;
