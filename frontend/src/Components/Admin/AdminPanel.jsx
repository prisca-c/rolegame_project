import React, {useState} from "react";
import AdminCharacters from "./Characters/AdminCharacters";
import AdminObjects from "./Objects/AdminObjects";

const AdminPanel = () => {
  const [showTab, setShowTab] = useState("characters");

  const handleTabChange = (e) => {
    setShowTab(e.currentTarget.value);
    console.log(showTab);
  }

  const tabList = () => {
    const tabs = ["Characters", "Objects"];
    return (
      <div className="tab-list">
        {tabs.map((tab) => {
          return (
            <button
              className="tab"
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

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className={"panel"}>
        <div className={"tabs"}>
          {tabList()}
        </div>
        <div className={"content"}>
          {showTab === "Characters" ? <AdminCharacters /> : <AdminObjects />}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel;