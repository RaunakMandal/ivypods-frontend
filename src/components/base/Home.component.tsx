import React, { useEffect, useState } from "react";
import { ContactsService } from "../../services/contacts.service";
import Base from "./Base.component";
import "../../styles/base/home.style.css";
import ContactCard from "./ContactCard.component";
import Modal  from "./Modal.component";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    fullname: "",
  });

  useEffect(() => {
    ContactsService.getContacts({ token: localStorage.getItem("token") })
      .then((res: any) => {
        setContacts(res.contacts);
      })
      .catch((err: any) => {
        console.log(err);
      });
    setCurrentUser(JSON.parse(localStorage.getItem("user") as string));
  }, [contacts.length]);

  return (
    <Base>
      <div className="contacts-container d-flex flex-column justify-content-center align-items-start">
        <span className="user-details">
          <p>Welcome, {currentUser.fullname} 👋</p>
        </span>
        <div className="contacts">
          <ol className="list-group list-group-numbered">
            {contacts?.map((contact: any, index: number) => (
              <div className="contact" key={contact._id}>
                <ContactCard {...contact} index={index} />
              </div>
            ))}
          </ol>
        </div>
        <div className="add-new">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addContact">Add New Contact</button>
        </div>
        <Modal />
      </div>
    </Base>
  );
};

export default Home;
