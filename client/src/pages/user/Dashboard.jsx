import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";
import s from "../../AllCssFile/UserDashboard.module.css"; // adjust path

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className={s.dashboardCard}>
            <h3>User Name: {auth?.user?.name}</h3>
            <h3>Email: {auth?.user?.email}</h3>
            <h3>Contact: {auth?.user?.phone}</h3>
            <h3>Address: {auth?.user?.address}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
