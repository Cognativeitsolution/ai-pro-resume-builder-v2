import React from "react";
import { BiSolidUser, BiUserCircle } from "react-icons/bi";

type SubmenuItem = {
  name?: string;
  path?: any;
};

type MenuItem = {
  className?: string;
  name?: string;
  path?: any;
  submenu?: SubmenuItem[];
};

type MenuIconItem = {
  name?: string;
  path?: any;
  className?: string;
  leftIcon?: React.ReactNode;
  submenu?: SubmenuItem[];
  LoginPath?: string;
  RegPath?: string;
};

export const menuItems: MenuItem[] = [
  {
    name: "Tools",
    submenu: [
      { name: "Create a Resume", path: "/" },
      { name: "Create a Cover Leter", path: "/" },
      { name: "Import Resume", path: "/" },
    ],
  },
  {
    name: "Resume",
    submenu: [
      { name: "Resume Templates", path: "/resume-templates" },
      { name: "Resume Examples", path: "/resume-examples" },
      { name: "Resume format", path: "/" },
      { name: "How to write a resume", path: "/" },
    ],
  },
  {
    name: "Cover Letter",
    submenu: [
      { name: "Cover Letter Templates", path: "/cover-templates" },
      { name: "Cover Letter Examples", path: "/cover-examples" },
      { name: "Cover Letter format", path: "/" },
      { name: "How to write a cover letter", path: "/" },
    ],
  },
  {
    name: "Blog",
    submenu: [
      { name: "How to write a blog 1", path: "/" },
      { name: "How to write a blog 2", path: "/" },
      { name: "How to write a blog 3", path: "/" },
      { name: "How to write a blog 4", path: "/" },
      { name: "How to write a blog 5", path: "/" },
    ],
  },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/packages" },
  // { name: "Contact", path: "/contact-us" },
  { name: "Profile", path: "/account", className: "block md:hidden" },
  { name: "Dashboard", path: "/dashboard", className: "block md:hidden" },
  { name: "Login", path: "/", className: "block md:hidden" },
];

export const menuIconItems: MenuIconItem[] = [
  {
    name: "Login",
    path: "/login",
    className:
      "text-black border border-transparent hover:bg-transparent px-0 hover:text-primaryBlue hidden md:flex",
    leftIcon: (
      <BiUserCircle
        className="text-lg text-[#00bfab] hover:text-[#0072b1]"
        size={36}
      />
    ),
    LoginPath: "LoginPath",
  },
  {
    path: "/register",
    className: "border border-transparent hover:bg-transparent px-0 ",
    leftIcon: (
      <div
        className={" items-center border-l gap-2 pl-2 hidden md:flex"}
        style={{ minHeight: "20px", minWidth: "20px" }}
      >
        <BiSolidUser className="bg-[#0072b1] text-white rounded-full p-1 text-2xl " />
      </div>
    ),
    submenu: [
      { name: "Profile", path: "/account" },
      { name: "Dashboard", path: "/dashboard" },
    ],
    RegPath: "RegPath",
  },
];
