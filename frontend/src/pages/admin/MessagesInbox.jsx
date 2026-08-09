import { useCallback, useEffect, useState } from "react";
import adminApi from "../../adminApi";

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ar", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(value.replace(" ", "T") + "Z")
  );
}

function MessagesInbox({ onAuthError }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    adminApi
      .get("/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => {
        if (err.response?.status === 401) onAuthError?.();
        else setError("تعذر تحميل الرسائل");
      })
      .finally(() => setLoading(false));
  }, [onAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف هذه الرسالة؟")) return;
    setBusyId(id);
    try {
      await adminApi.delete(`/messages/${id}`);
      load();
    } catch (err) {
      if (err.response?.status === 401) onAuthError?.();
      else setError("تعذر حذف الرسالة");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>رسائل التواصل</h2>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <p className="admin-muted">جاري التحميل...</p>
      ) : messages.length === 0 ? (
        <p className="admin-muted">لا توجد رسائل بعد.</p>
      ) : (
        <div className="admin-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="admin-message-card">
              <div className="admin-message-head">
                <div>
                  <strong>{msg.name}</strong>
                  <a href={`mailto:${msg.email}`}>{msg.email}</a>
                </div>
                <span className="admin-message-date">{formatDate(msg.created_at)}</span>
              </div>
              <p className="admin-message-body">{msg.message}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(msg.id)}
                disabled={busyId === msg.id}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessagesInbox;
