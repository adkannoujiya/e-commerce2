import React from "react";
import { NavLink, Link } from "react-router-dom";
import s from "../AllCssFile/UserMenu.module.css"; // adjust path as needed

const UserMenu = () => {
  return (
    <div className={`text-center ${s.userMenu}`}>
      <Link to="/dashboard/user" className={s.profileLink}>
        <h4>User Profile</h4>
      </Link>

      <div className={s.menuList}>
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Update Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
