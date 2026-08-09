import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../api";
import { RevealGroup, RevealItem } from "./Reveal";
import "./Contact.css";

const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await api.post("/messages", form);
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error.response?.data?.error || "تعذر إرسال الرسالة، حاول مرة أخرى لاحقاً."
      );
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <RevealGroup className="section-head">
          <RevealItem as="span" className="section-eyebrow">
            تواصل معي
          </RevealItem>
          <RevealItem as="h2" className="section-title">
            لديك مشروع أو فكرة؟
          </RevealItem>
          <RevealItem as="p" className="section-subtitle">
            راسلني عبر النموذج، أو تواصل مباشرة على{" "}
            {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
          </RevealItem>
        </RevealGroup>

        <RevealGroup
          as="form"
          className="card contact-form"
          stagger={0.08}
          onSubmit={handleSubmit}
        >
          <RevealItem as="div" className="contact-row">
            <label className="contact-field">
              <span>الاسم</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="اسمك الكامل"
                required
              />
            </label>

            <label className="contact-field">
              <span>البريد الإلكتروني</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
          </RevealItem>

          <RevealItem as="label" className="contact-field">
            <span>الرسالة</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا..."
              rows={5}
              required
            />
          </RevealItem>

          <RevealItem as="div">
            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {status === "sending" ? "جاري الإرسال..." : "إرسال الرسالة"}
            </motion.button>
          </RevealItem>

          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.p
                key="sent"
                className="contact-feedback success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                تم إرسال رسالتك بنجاح، شكراً لتواصلك!
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                className="contact-feedback error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </RevealGroup>
      </div>
    </section>
  );
}

export default Contact;
