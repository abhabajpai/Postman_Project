import React, { useContext, useState, useEffect } from "react";
import styles from "./layout.module.css";
import TabCollections from "../tabs/TabCollections";
import TabEnv from "../tabs/TabEnv";
import TabHistory from "../tabs/TabHistory";
import { Context } from "../../contexts/Store";
import VerticalResizableComponent from "../tabs/Resizer";

const Sidebar = () => {
  const { state, dispatch } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState(state.sideDrawerTab);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        dispatch({ type: "SET_SIDEDRAWER", payload: false });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const setCurrentTab = (tab) => {
    if (selectedTab === tab) {
      dispatch({ type: "SET_SIDEDRAWER", payload: !state.sideDrawerOpened });
    } else {
      setSelectedTab(tab);
      dispatch({ type: "SET_SIDEDRAWER", payload: true });
      dispatch({ type: "SET_SIDEDRAWER_TAB", payload: tab });
    }
  };

  const SidebarContent = (
    <>
      {state.sideDrawerOpened && (
        <div className="flex flex-col w-full border-b bg-gray-100 border-gray-300 p-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-normal">
              <i className="feather-user pr-4"></i>My Workspace
            </span>
          </div>
        </div>
      )}
      <div className={styles.sidebar_tabs}>
        <div className={styles.sidebar_tab_buttons}>
          <ul>
            <li
              onClick={() => setCurrentTab("collections")}
              className={
                selectedTab === "collections"
                  ? state.sideDrawerOpened
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="Collections"
            >
              <i className="feather-folder"></i>
              <span>Collections</span>
            </li>
            <li
              onClick={() => setCurrentTab("env")}
              className={
                selectedTab === "env"
                  ? state.sideDrawerOpened
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="Environments"
            >
              <i className="feather-box"></i>
              <span>Environments</span>
            </li>
            <li
              onClick={() => setCurrentTab("history")}
              className={
                selectedTab === "history"
                  ? state.sideDrawerOpened
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="History"
            >
              <i className="feather-clock"></i>
              <span>History</span>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar_tab_panels}>
          {(() => {
            switch (selectedTab) {
              case "env":
                return <TabEnv />;
              case "history":
                return <TabHistory />;
              default:
                return <TabCollections />;
            }
          })()}
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`${styles.sidebar} ${
        !state.sideDrawerOpened ? styles.sidebar_collapsed : ""
      }`}
    >
      {state.sideDrawerOpened ? (
        <VerticalResizableComponent>
          {SidebarContent}
        </VerticalResizableComponent>
      ) : (
        SidebarContent
      )}
    </div>
  );
};

export default Sidebar;
