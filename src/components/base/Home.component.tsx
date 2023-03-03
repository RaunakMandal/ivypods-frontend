import React, { useEffect, useState } from "react";
import { ContactsService } from "../../services/contacts.service";
import Base from "./Base.component";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    ContactsService.getContacts({token: localStorage.getItem("token")})
      .then((res: any) => {
        setContacts(res.contacts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [contacts.length]);

  return (
    <Base>
      <div className="contacts-container">
        <h1>Contacts</h1>
        <div className="contacts">
          {contacts?.map((contact: any) => (
            <div className="contact" key={contact._id}>
              <h3>{contact.fullname}</h3>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;
