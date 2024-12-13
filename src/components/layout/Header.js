import { useState } from "react";
import ArrowDownIcon from "../Arrow-downSVG";
import styles from "./layout.module.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const navigateTo = (url) => {
    window.location.href = url;
  };

  return (
    <>
      <header className="border-b border-[--border-color] px-inline-custom flex justify-between bg-[--td-focus-bg] relative">
        <ul className="flex justify-start">
          <li className="flex items-center cursor-pointer px-inline-var text-sm bg-none hover:bg-[#EDEDED] text-black max-md:hidden">
            Home
          </li>
          <li
            className="relative flex items-center cursor-pointer px-inline-var text-sm bg-none hover:bg-[#EDEDED] text-black max-md:px-2"
            onClick={toggleDropdown}
          >
            Workspaces
            <span>
              <ArrowDownIcon />
            </span>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white z-50 border border-gray-200 rounded shadow-lg">
                <div className="p-2">
                  <p className="text-xs text-gray-500">Recently visited</p>
                  <ul>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      apiii
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      My Workspace
                    </li>
                  </ul>
                </div>
                <div className="border-t border-gray-200">
                  <p className="p-2 text-xs text-gray-500">More workspaces</p>
                  <p className="p-2 text-sm text-gray-700">
                    No workspaces found
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <button className="w-full p-2 text-left text-blue-500 hover:bg-gray-100">
                    View all workspaces
                  </button>
                </div>
              </div>
            )}
          </li>
          <li className="flex text-nowrap overflow-hidden items-center cursor-pointer px-inline-var text-sm bg-none hover:bg-[#EDEDED] text-black max-md:hidden">
            API Network
            <span>
              <ArrowDownIcon />
            </span>
          </li>
          <li className="flex items-center cursor-pointer px-2 text-sm bg-none hover:bg-[#EDEDED] text-black md:hidden">
            More
            <span>
              <ArrowDownIcon />
            </span>
          </li>
        </ul>
        <div>
          <div className="max-lg:hidden bg-[--light-bg] rounded py-0.5 pr-2 pl-5 items-center flex text-center my-1.5 mx-auto text-[--text-color]">
            <i className="feather-search"></i>
            <input
              type="text"
              placeholder="Search Postman"
              className="w-44 p-1 bg-transparent rounded-none placeholder:text-[#6B6B6B] placeholder:text-sm placeholder:pl-2"
            />
          </div>
        </div>
        <div className={styles.header_menu__right}>
          <div className="lg:hidden flex items-center w-10 justify-center">
            <button className="h-9 w-9 rounded bg-transparent border-none cursor-pointer text-[--text-color] text-[16px] hover:bg-[--light-bg]">
              <i className="feather-search"></i>
            </button>
          </div>
          <div className={styles.iconMenu}>
            <button>
              <i className="feather-cloud"></i>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button className="h-7 rounded-md border-none cursor-pointer text-sm bg-[#1862e8] px-2 py-0.5 text-[#fff] hover:bg-opacity-50">
              <i className="feather-user-plus mr-1 text-sm"></i>
              <span className="max-md:hidden">Invite</span>
            </button>
          </div>
          <div className={styles.iconMenu}>
            <button>
              <i className="feather-rss"></i>
            </button>
          </div>
          <div className={styles.iconMenu}>
            <button onClick={toggleSettingsDropdown}>
              <i className="feather-settings"></i>
            </button>
          </div>
          <div className={styles.iconMenu}>
            <button>
              <i className="feather-bell"></i>
            </button>
          </div>
          <div className={styles.userMenu}>
            <div></div>
          </div>
          <div className="flex items-center justify-end">
            <div className="bg-[--light-bg] rounded-md">
              <button className="text-black p-1 text-sm font-medium rounded-md bg-transparent border-none cursor-pointer h-8 hover:bg-[--light-bg-hover]">
                <i className="feather-user-check lg:hidden px-0.5"></i>
                <span className="max-lg:hidden px-2">Upgrade</span>
              </button>
              <button className="bg-transparent border-none rounded-md cursor-pointer h-8 hover:bg-[--light-bg-hover]">
                <i className="feather-chevron-down px-0.5"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      {showSettingsDropdown && (
        <div className="fixed top-10 right-0 mt-1 w-48 bg-white z-50 border border-gray-200 rounded shadow-lg">
          <ul>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigateTo(
                  "  https://learning.postman.com/docs/introduction/overview/"
                )
              }
            >
              Learning Center
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigateTo("https://support.postman.com/hc/en-us")}
            >
              Support Center
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigateTo("https://www.postman.com/trust/trust")}
            >
              Trust and Security
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigateTo(
                  "https://www.postman.com/legal/privacy-policy/privacy-policy"
                )
              }
            >
              Privacy Policy
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigateTo("https://www.postman.com/legal/terms/terms")
              }
            >
              Terms
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
