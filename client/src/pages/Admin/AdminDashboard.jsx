import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";
import s from "../../AllCssFile/AdminDashboard.module.css"; // CSS module import

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex justify-content-center">
          <div className={s.adminCard}>
            <h3>
              Admin Name: <span>{auth?.user?.name}</span>
            </h3>
            <h3>
              Email: <span>{auth?.user?.email}</span>
            </h3>
            <h3>
              Contact: <span>{auth?.user?.contact}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
