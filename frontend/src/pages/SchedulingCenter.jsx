import { useState } from "react";
import VacationManager from "../components/admin/scheduling/VacationManager";
import ManageAvailability from "./ManageAvailability";
import BlockedTimeManager from "../components/admin/scheduling/BlockedTimeManager";
import ManageHolidays from "./ManageHolidays";
import CalendarView from "../components/admin/scheduling/CalendarView";
function SchedulingCenter() {

  const [activeTab, setActiveTab] =
    useState("weekly");

  const tabs = [
    {
      id: "weekly",
      label: "Weekly Schedule",
    },
    {
      id: "holiday",
      label: "Holidays",
    },
    {
      id: "vacation",
      label: "Vacation",
    },
    {
      id: "blocked",
      label: "Blocked Time",
    },
    {
      id: "calendar",
      label: "Calendar",
    },
  ];

  return (
    <div
      style={{
        padding: "35px",
        background: "#F5F6FA",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#47685F",
          marginBottom: "25px",
        }}
      >
        Scheduling Center
      </h1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              background:
                activeTab === tab.id
                  ? "#47685F"
                  : "white",
              color:
                activeTab === tab.id
                  ? "white"
                  : "#47685F",
              fontWeight: "600",
              boxShadow:
                "0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            {tab.label}
          </button>
        ))}
            </div>

      <div
        style={{
          background: "white",
          borderRadius: "18px",
          padding: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,.08)",
        }}
      >
        {activeTab === "weekly" && (
          <ManageAvailability />
        )}

        {activeTab === "holiday" && (
          <ManageHolidays />
        )}

{activeTab === "vacation" && (
  <VacationManager />
)}

        {activeTab === "blocked" && (
  <BlockedTimeManager />
)}

{activeTab === "calendar" && (
  <CalendarView />
)}
      </div>

    </div>
  );
}

export default SchedulingCenter;