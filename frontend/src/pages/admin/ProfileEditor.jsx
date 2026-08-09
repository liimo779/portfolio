import { useEffect, useState } from "react";
import adminApi from "../../adminApi";
import { PROFILE_FIELDS } from "./adminFields";
import ResourceForm from "./ResourceForm";

function ProfileEditor({ onAuthError }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    adminApi
      .get("/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        if (err.response?.status === 401) onAuthError?.();
        else setError("تعذر تحميل بيانات الملف الشخصي");
      })
      .finally(() => setLoading(false));
  }, [onAuthError]);

  const handleSave = async (values) => {
    try {
      const res = await adminApi.put("/profile", values);
      setProfile(res.data);
      setSavedAt(Date.now());
    } catch (err) {
      if (err.response?.status === 401) onAuthError?.();
      else setError("تعذر حفظ التعديلات");
    }
  };

  if (loading) return <p className="admin-muted">جاري التحميل...</p>;
  if (!profile) return <p className="admin-error">{error || "تعذر تحميل البيانات"}</p>;

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>الملف الشخصي</h2>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {savedAt && <p className="admin-success">تم حفظ التعديلات بنجاح.</p>}

      <ResourceForm
        fields={PROFILE_FIELDS}
        initialValues={profile}
        onSubmit={handleSave}
        submitLabel="حفظ التعديلات"
      />
    </div>
  );
}

export default ProfileEditor;
