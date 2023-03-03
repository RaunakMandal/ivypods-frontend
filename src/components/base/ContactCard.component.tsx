import { useState } from "react";
import { ContactsService } from "../../services/contacts.service";
import "../../styles/components/contact-card.style.css";

interface ContactProps {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  index: number;
}

const ContactCard = ({
  _id,
  fullname,
  email,
  phone,
  message,
  index,
}: ContactProps) => {
  const collapseId = `collapseExample-${index}`;
  const collapseIdWithHash = `#collapseExample-${index}`;

  const [contact, setContact] = useState({
    fullname: fullname || "",
    email: email || "",
    phone: phone || "",
    message: message || "",
  });

  const [editing, setEditing] = useState(false);

  const handleDataChange = (e: any) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  // TODO: Add proper error handling

  const handleEdit = async () => {
    await ContactsService.updateContact(_id, {
      token: localStorage.getItem("token"),
      body: contact,
    }).then((res: any) => {
      if (res.error) {
        console.log(res.message);
        return;
      } else {
        console.log(res.message);
        setEditing(false);
      }
    });
  };
  const handleDelete = async () => {
    await ContactsService.deleteContact(_id, {
      token: localStorage.getItem("token"),
    }).then((res: any) => {
      if (res.error) {
        console.log(res.message);
        return;
      } else {
        console.log(res.message);
        setEditing(false);
      }
    });
  };
  const handleCancel = () => {
    setEditing(false);
    setContact({
      fullname: fullname || "",
      email: email || "",
      phone: phone || "",
      message: message || "",
    });
  };

  return (
    <div className="contact-card">
      <li className="list-group-item d-flex justify-content-between align-items-start flex-column">
        <div className="ms-2 me-auto d-flex flex-row justify-content-between w-100">
          <div>{contact.fullname}</div>
          <span
            className="badge bg-success rounded-pill"
            data-bs-toggle="collapse"
            data-bs-target={collapseIdWithHash}
            aria-expanded="false"
            aria-controls={collapseId}
          >
            Expand
          </span>
        </div>
        <div className="collapse collapse-details" id={collapseId}>
          <div className="card card-body">
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Full name..."
              value={contact.fullname}
              disabled={!editing}
              onChange={(e) => handleDataChange(e)}
            />
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email..."
              value={contact.email}
              disabled={!editing}
              onChange={(e) => handleDataChange(e)}
            />
            <input
              type="number"
              name="phone"
              className="form-control"
              placeholder="Phone..."
              value={contact.phone}
              disabled={!editing}
              onChange={(e) => handleDataChange(e)}
            />
            <input
              type="text"
              name="message"
              className="form-control"
              placeholder="Message..."
              value={contact.message}
              disabled={!editing}
              onChange={(e) => handleDataChange(e)}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => !editing ? setEditing(true) : handleEdit()}
            >
              {editing ? "Save" : "Edit"}
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={handleCancel}
              disabled={!editing}
            >
              Cancel
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ContactCard;
