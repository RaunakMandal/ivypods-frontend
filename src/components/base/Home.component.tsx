import React, { useEffect, useState } from "react";
import { ContactsService } from "../../services/contacts.service";
import Base from "./Base.component";
import "../../styles/base/home.style.css";
import ContactCard from "./ContactCard.component";
import Modal  from "./Modal.component";
import Navbar from "./Navbar.component";
import { Player } from "@lottiefiles/react-lottie-player";

enum Error {
  loading = "https://assets10.lottiefiles.com/packages/lf20_bo8vqwyw.json",
  notfound = "https://assets7.lottiefiles.com/packages/lf20_uqfbsoei.json",
  error = "https://assets9.lottiefiles.com/packages/lf20_bdnjxekx.json",
  empty = "",
}

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [query, setQuery] = useState("");

  // HACK ALERT: This is a hack to force a re-render of the component
  const [refresh, setRefresh] = useState(1);

  const [error, setError] = useState({
    show: true,
    image: Error.loading,
    message: "Please wait while we fetch your contacts...",
  });

  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    fullname: "",
  });

  useEffect(() => {
    const filteredContacts = contacts?.filter((contact: any) =>
      contact.fullname.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedContacts(filteredContacts);
    setError({ show: false, image: Error.empty, message: "" });
    if (query && filteredContacts?.length === 0) {
      setError({
        show: true,
        image: Error.notfound,
        message: `No contacts found for ${query}`,
      });
    } else if (!query && filteredContacts?.length === 0) {
      setError({
        show: true,
        image: Error.notfound,
        message: error.message || "No contacts found. Please add a contact.",
      });
    }
  }, [query, contacts]);

  useEffect(() => {
    ContactsService.getContacts({ token: localStorage.getItem("token") })
      .then((res: any) => {
        setContacts(res.contacts);
        setSearchedContacts(res.contacts);
        setError({ show: false, image: Error.empty, message: "" });
      })
      .catch((err: any) => {
        setError({
          show: true,
          image: Error.error,
          message: "Something went wrong. Please try again later.",
        });
      })
      .finally(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user") as string));
      });
  }, [refresh]);

  return (
    <>
      <Navbar user={currentUser.fullname} setQuery={setQuery} />
      <Base style={"start"}>
        <div className="contacts-container d-flex flex-column justify-content-center align-items-start">
          <div className="contacts">
            <ol className="list-group list-group-numbered">
              {searchedContacts?.map((contact: any, index: number) => (
                <div className="contact" key={contact._id}>
                  <ContactCard
                    {...contact}
                    index={index}
                    setContacts={setContacts}
                  />
                </div>
              ))}
            </ol>
            {error.show && (
              <div className="error d-flex flex-column align-items-center">
                <Player
                  autoplay
                  loop
                  src={error.image}
                  style={{ height: "300px", width: "300px" }}
                ></Player>
                <h4>{error.message}</h4>
              </div>
            )}
          </div>
          <Modal setRefresh={setRefresh} />
        </div>
      </Base>
    </>
  );
};

export default Home;
