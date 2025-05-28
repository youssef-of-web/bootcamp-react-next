import React from "react";
import { Avatar, type MenuProps } from "antd";
import { Button, Dropdown } from "antd";

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#" onClick={logout}>
        Logout
      </a>
    ),
  },
];

const DropDownUser = () => (
  <Dropdown menu={{ items }} placement="top">
    <Avatar size={40}>USER</Avatar>
  </Dropdown>
);

export default DropDownUser;
