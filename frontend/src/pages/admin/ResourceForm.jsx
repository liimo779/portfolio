import { useState } from "react";

function ResourceForm({ fields, initialValues, onSubmit, onCancel, submitLabel = "حفظ" }) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, event) => {
    const raw = field.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field.name]: raw }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-grid">
        {fields.map((field) => (
          <label
            key={field.name}
            className={`admin-field ${field.type === "textarea" ? "admin-field-wide" : ""} ${
              field.type === "checkbox" ? "admin-field-checkbox" : ""
            }`}
          >
            <span>{field.label}</span>

            {field.type === "textarea" && (
              <textarea
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field, e)}
                required={field.required}
                rows={4}
              />
            )}

            {field.type === "checkbox" && (
              <input
                type="checkbox"
                checked={Boolean(values[field.name])}
                onChange={(e) => handleChange(field, e)}
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field, e)}
                required={field.required}
              />
            )}

            {field.type === "text" && (
              <input
                type="text"
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field, e)}
                required={field.required}
              />
            )}
          </label>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "جاري الحفظ..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>
            إلغاء
          </button>
        )}
      </div>
    </form>
  );
}

export default ResourceForm;
