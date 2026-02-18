const NewTicket = () => {
  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>Create New Ticket</h2>

      <div className="card" style={{ maxWidth: "700px" }}>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="Enter ticket title" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" placeholder="Describe the issue clearly..." />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select>
              <option>Billing</option>
              <option>Technical</option>
              <option>Account</option>
              <option>General</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <button className="btn-primary">
            Submit Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTicket;
