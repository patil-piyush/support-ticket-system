import { useState, useEffect } from "react";
import { createTicket, classifyTicket } from "../api/ticketsApi";
import { useNavigate } from "react-router-dom";

const NewTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  const [classifyLoading, setClassifyLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [classifyError, setClassifyError] = useState(null);

  // Debounce classification
  useEffect(() => {
    if (!formData.description) return;

    const timeout = setTimeout(async () => {
      try {
        setClassifyLoading(true);
        setClassifyError(null);

        const data = await classifyTicket(formData.description);

        setFormData((prev) => ({
          ...prev,
          category: data.suggested_category,
          priority: data.suggested_priority,
        }));
      } catch (error) {
        setClassifyError("AI suggestion unavailable.");
      } finally {
        setClassifyLoading(false);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [formData.description]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      await createTicket(formData);
      navigate("/tickets");
    } catch (error) {
      alert("Failed to create ticket.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>Create New Ticket</h2>

      <div className="card" style={{ maxWidth: "700px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              required
              maxLength={200}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue clearly..."
            />
          </div>

          {classifyLoading && (
            <p style={{ fontSize: "13px", color: "#2563eb" }}>
              Analyzing description with AI...
            </p>
          )}

          {classifyError && (
            <p style={{ fontSize: "13px", color: "#b91c1c" }}>
              {classifyError}
            </p>
          )}

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="account">Account</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              required
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <button
            className="btn-primary"
            disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTicket;
