interface Props {
  user?: string;
  setQuery?: any;
}

const Navbar = ({ user, setQuery }: Props) => {
  const changeQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const logoutUser = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      {user && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <p className="navbar-brand mb-0">
              Hi, <strong>{user}</strong> 👋
            </p>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#addContact"
                  >
                    Add New Contact
                  </button>
                </li>
              </ul>
              <div className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Contacts 🔍"
                  aria-label="Search"
                  onChange={(e) => changeQuery(e)}
                ></input>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
