import { useState } from "react";
import axios from "axios";
import { setToken } from "../../adminAuth";
import "./admin.css";

function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", { password });
      setToken(res.data.token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "تعذر تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-screen">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>لوحة التحكم</h1>
        <p className="admin-muted">أدخل كلمة المرور للمتابعة</p>

        <label className="admin-field">
          <span>كلمة المرور</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
