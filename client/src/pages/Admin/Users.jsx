import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import s from "../../AllCssFile/AdminUsers.module.css"; // Import your CSS Module

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/get-users"
      );
      setUser(data.allUsers);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className={s.heading}>All Users</h1>
          <div className={s.cardContainer}>
            {user?.map((u, i) => (
              <div key={i} className={s.userCard}>
                <p>
                  <strong>Name:</strong> {u.name}
                </p>
                <p>
                  <strong>Email:</strong> {u.email}
                </p>
                <p>
                  <strong>Phone:</strong> {u.phone}
                </p>
                <p>
                  <strong>Address:</strong> {u.address}
                </p>
                <div className={s.buttonGroup}>
                  <button className={s.editBtn}>Edit</button>
                  <button className={s.deleteBtn}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
