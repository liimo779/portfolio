import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileEditor from "./ProfileEditor";
import ResourceManager from "./ResourceManager";
import MessagesInbox from "./MessagesInbox";
import adminApi from "../../adminApi";
import "./admin.css";

const TABS = [
  { id: "profile", label: "الملف الشخصي" },
  { id: "skills", label: "المهارات" },
  { id: "projects", label: "المشاريع" },
  { id: "experience", label: " الانشطة" },
  { id: "education", label: "التعليم" },
  { id: "messages", label: "الرسائل" },
];

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [exporting, setExporting] = useState(false);

  const handleAuthError = () => onLogout();

  const handleExport = async () => {
    setExporting(true);
    try {
      const { data } = await adminApi.get("/export");
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `database-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      }
    } finally {
      setExporting(false);
    }
  };

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
          <button className="btn btn-ghost" onClick={handleExport} disabled={exporting}>
            {exporting ? "جاري التصدير..." : "Export Database"}
          </button>
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
