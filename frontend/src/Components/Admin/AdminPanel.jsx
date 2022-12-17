import React, {useState} from "react";
import AdminCharacters from "./Characters/AdminCharacters";
import AdminObjects from "./Objects/AdminObjects";
import "../../styles/AdminPanel.scss";

const AdminPanel = () => {
  const [showTab, setShowTab] = useState("Characters");

  const handleTabDisplay = () => {
    // switch statement
    switch (showTab) {
      case "Characters":
        return <AdminCharacters />;
      case "Objects":
        return <AdminObjects />;
      default:
        return <AdminCharacters />;
    }
  }

  //Handle tab list buttons
  const tabList = () => {
    const tabs = ["Characters", "Objects"];

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
              key={tab}
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