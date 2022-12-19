import React, {useState} from "react";
import AdminCharacters from "./Characters/AdminCharacters";
import AdminObjects from "./Objects/AdminObjects";
import AdminClasses from "./Classes/AdminClasses";
import AdminInventories from "./Inventories/AdminInventories";
import "../../Styles/AdminPanel.scss";

const AdminPanel = () => {
  const [showTab, setShowTab] = useState("Characters");

  const handleTabDisplay = () => {
    // switch statement
    switch (showTab) {
      case "Characters":
        return <AdminCharacters />;
      case "Objects":
        return <AdminObjects />;
      case "Class":
        return <AdminClasses />;
      case "Inventories":
        return <AdminInventories />;
      default:
        return <AdminCharacters />;
    }
  }

  //Handle tab list buttons
  const tabList = () => {
    const tabs = ["Characters", "Objects", "Class", "Inventories"];

    const handleTabChange = (e) => {
      setShowTab(e.currentTarget.value);
    }

    //Handle style for active tab
    const handleClass = (tab) => {
      if (tab === showTab) {
        return "tab tab--active";
      } else {
        return "tab";
      }
    }

    // Display tab list
    return (
      <div className="tab-list">
        {tabs.map((tab, i) => {
          return (
            <button
              className={handleClass(tab)}
              key={i}
              onClick={handleTabChange}
              value={tab}
            >
              {tab}
            </button>
          );
        })}
      </div>
    )
  }

  //Display admin panel
  return (
    <div>
      <h1>Admin Panel</h1>
      <div className={"panel"}>
        <div className={"tabs"}>
          {tabList()}
        </div>
        <div className={"content"}>
          {handleTabDisplay()}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel;