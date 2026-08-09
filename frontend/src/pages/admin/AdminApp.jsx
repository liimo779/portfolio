import { useState } from "react";
import { getToken, clearToken } from "../../adminAuth";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function AdminApp() {
  const [authed, setAuthed] = useState(Boolean(getToken()));

  const handleLogout = () => {
    clearToken();
    setAuthed(false);
  };

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

export default AdminApp;
