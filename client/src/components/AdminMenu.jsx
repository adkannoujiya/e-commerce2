import React from "react";
import { NavLink } from "react-router-dom";
import s from "../AllCssFile/AdminMenu.module.css"; // Adjust path if needed

const AdminMenu = () => {
  return (
    <div className={`text-center ${s.adminMenu}`}>
      <h4 className={s.title}>Admin Panel</h4>
      <div className={s.menuList}>
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Create-Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Create-Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/product"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            `${s.menuItem} ${isActive ? s.active : ""}`
          }
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
