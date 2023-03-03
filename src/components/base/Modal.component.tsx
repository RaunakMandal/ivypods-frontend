import React, { useState } from "react";
import { ContactsService } from "../../services/contacts.service";
import Alert from "../shared/Alert";

const Modal = () => {
  const [contact, setContact] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleDataChange = (e: any) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const addContact = async () => {
    setLoading(true);
    await ContactsService.addContact({
      token: localStorage.getItem("token"),
      body: contact,
    })
      .then((res: any) => {
        setLoading(false);
        if (res.error) {
          setAlert({
            show: true,
            message: res.message,
            type: "danger",
          });
          return;
        } else {
          setAlert({
            show: true,
            message: res.message,
            type: "success",
          });
          setContact({
            fullname: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      })
      .catch((err: any) => {
        setLoading(false);
        setAlert({
          show: true,
          message: err.message,
          type: "danger",
        });
      });
  };
  return (
    <div
      className="modal fade"
      id="addContact"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add a new contact</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Full name..."
              value={contact.fullname}
              onChange={(e) => handleDataChange(e)}
            />
            <input
              type="number"
              name="phone"
              className="form-control"
              placeholder="Phone..."
              value={contact.phone}
              onChange={(e) => handleDataChange(e)}
            />
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email... (optional)"
              value={contact.email}
              onChange={(e) => handleDataChange(e)}
            />
            <input
              type="text"
              name="message"
              className="form-control"
              placeholder="Message.. (optional)"
              value={contact.message}
              onChange={(e) => handleDataChange(e)}
            />
          </div>
          <div className="modal-footer">
            <Alert
              type={alert.type}
              message={alert.message}
              show={alert.show}
            />
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={loading}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addContact}
              disabled={loading}
            >
              Add Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
