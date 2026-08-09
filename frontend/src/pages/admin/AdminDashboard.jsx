import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileEditor from "./ProfileEditor";
import ResourceManager from "./ResourceManager";
import MessagesInbox from "./MessagesInbox";
import "./admin.css";

const TABS = [
  { id: "profile", label: "الملف الشخصي" },
  { id: "skills", label: "المهارات" },
  { id: "projects", label: "المشاريع" },
  { id: "experience", label: "الخبرة" },
  { id: "education", label: "التعليم" },
  { id: "messages", label: "الرسائل" },
];

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("profile");

  const handleAuthError = () => onLogout();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">لوحة التحكم</div>

        <nav className="admin-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? "admin-nav-item-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-link">
            ← عرض الموقع
          </Link>
          <button className="btn btn-ghost admin-logout" onClick={onLogout}>
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="admin-content">
        {activeTab === "profile" && <ProfileEditor onAuthError={handleAuthError} />}
        {activeTab === "messages" && <MessagesInbox onAuthError={handleAuthError} />}
        {["skills", "projects", "experience", "education"].includes(activeTab) && (
          <ResourceManager resource={activeTab} onAuthError={handleAuthError} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
