import { useEffect, useRef, useState } from "react";
import { ContactsService } from "../../services/contacts.service";
import "../../styles/components/contact-card.style.css";

interface ContactProps {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  index: number;
  setContacts?: any;
}

const ContactCard = ({
  _id,
  fullname,
  email,
  phone,
  message,
  index,
  setContacts,
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
  const [loading, setLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = document.getElementById(ref.current?.id || "");
    element?.addEventListener("shown.bs.collapse", () => {
      setExpanded(true);
    });
    element?.addEventListener("hidden.bs.collapse", () => {
      setExpanded(false);
    });
  }, []);

  const handleDataChange = (e: any) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    setLoading(true);
    await ContactsService.updateContact(_id, {
      token: localStorage.getItem("token"),
      body: contact,
    })
      .then((res: any) => {
        if (res.error) {
          return;
        } else {
          setContacts((prev: any) =>
            prev.map((cont: any) => {
              /**
               * When a contact is edited, the contactSetter function is called
               * with a callback function that maps through the contacts array
               * and updates the edited contact.
               */
              if (cont._id === _id) {
                return {
                  ...cont,
                  fullname: contact.fullname,
                  email: contact.email,
                  phone: contact.phone,
                  message: contact.message,
                };
              } else {
                return cont;
              }
            })
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setEditing(false);
        setLoading(false);
      });
  };
  const handleDelete = async () => {
    setLoading(true);
    await ContactsService.deleteContact(_id, {
      token: localStorage.getItem("token"),
    })
      .then((res: any) => {
        if (res.error) {
          return;
        } else {
          /**
           * When a contact is deleted, the contactSetter function is called
           * with a callback function that filters out the deleted contact
           * from the contacts array.
           */
          setContacts((prev: any) =>
            prev.filter((cont: any) => cont._id !== _id)
          );
          setEditing(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setEditing(false);
        setLoading(false);
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
    <div className="contact-card mb-1">
      <li className="list-group-item d-flex justify-content-between align-items-start flex-column">
        <div className="ms-2 me-auto d-flex flex-row justify-content-between w-100">
          <div>{contact.fullname}</div>
          <span
            className="badge rounded-pill"
            data-bs-toggle="collapse"
            data-bs-target={collapseIdWithHash}
            aria-expanded="false"
            aria-controls={collapseId}
          >
            {expanded ? "Collapse" : "Expand"}
          </span>
        </div>
        <div className="collapse collapse-details" id={collapseId} ref={ref}>
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
              onClick={() => (!editing ? setEditing(true) : handleEdit())}
              disabled={loading}
            >
              <span
                className="spinner-border spinner-border-sm me-2"
                hidden={!loading || !editing}
              ></span>
              {editing ? "Save" : "Edit"}
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              <span
                className="spinner-border spinner-border-sm me-2"
                hidden={!loading || editing}
              ></span>
              Delete
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              data-bs-toggle="collapse"
              data-bs-target={collapseIdWithHash}
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ContactCard;
