import { Fragment, useEffect, useState, useCallback } from "react";
import adminApi from "../../adminApi";
import { RESOURCES } from "./adminFields";
import ResourceForm from "./ResourceForm";

function ResourceManager({ resource, onAuthError }) {
  const config = RESOURCES[resource];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); // null | "new" | id
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.get(`/resources/${resource}`);
      setItems(res.data);
    } catch (err) {
      if (err.response?.status === 401) onAuthError?.();
      else setError("تعذر تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }, [resource, onAuthError]);

  useEffect(() => {
    load();
    setEditingId(null);
  }, [load]);

  const handleCreate = async (values) => {
    try {
      await adminApi.post(`/resources/${resource}`, values);
      setEditingId(null);
      load();
    } catch (err) {
      if (err.response?.status === 401) onAuthError?.();
      else setError("تعذر إضافة العنصر");
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await adminApi.put(`/resources/${resource}/${id}`, values);
      setEditingId(null);
      load();
    } catch (err) {
      if (err.response?.status === 401) onAuthError?.();
      else setError("تعذر حفظ التعديلات");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`هل أنت متأكد من حذف هذا الـ${config.singular}؟`)) return;
    setBusyId(id);
    try {
      await adminApi.delete(`/resources/${resource}/${id}`);
      load();
    } catch (err) {
      if (err.response?.status === 401) onAuthError?.();
      else setError("تعذر حذف العنصر");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>{config.title}</h2>
        {editingId === null && (
          <button className="btn btn-primary" onClick={() => setEditingId("new")}>
            + إضافة {config.singular}
          </button>
        )}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {editingId === "new" && (
        <ResourceForm
          fields={config.fields}
          initialValues={config.empty}
          onSubmit={handleCreate}
          onCancel={() => setEditingId(null)}
          submitLabel="إضافة"
        />
      )}

      {loading ? (
        <p className="admin-muted">جاري التحميل...</p>
      ) : items.length === 0 ? (
        <p className="admin-muted">لا توجد عناصر بعد.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.displayColumns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th className="admin-table-actions-col">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <Fragment key={item.id}>
                  <tr>
                    {config.displayColumns.map((col) => (
                      <td key={col.key}>
                        {col.key === "featured"
                          ? item[col.key]
                            ? "نعم"
                            : "لا"
                          : item[col.key] ?? "—"}
                      </td>
                    ))}
                    <td className="admin-table-actions">
                      <button
                        className="btn btn-ghost"
                        onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                      >
                        {editingId === item.id ? "إغلاق" : "تعديل"}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                        disabled={busyId === item.id}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                  {editingId === item.id && (
                    <tr>
                      <td colSpan={config.displayColumns.length + 1}>
                        <ResourceForm
                          fields={config.fields}
                          initialValues={item}
                          onSubmit={(values) => handleUpdate(item.id, values)}
                          onCancel={() => setEditingId(null)}
                          submitLabel="حفظ التعديلات"
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResourceManager;
