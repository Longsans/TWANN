import { Link } from "react-router-dom";

export const Header = ({ brand, rightItems, children }) => {
  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom box-shadow">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ fontFamily: "monospace" }}
            to="/"
          >
            {brand}
          </Link>
          <ul className="navbar-nav flex-grow-1 list-group-horizontal">
            <div style={{ width: "7%" }}></div>
            <div className="d-flex align-items-center flex-shrink-0">
              {children}
            </div>
            <div className="w-100"></div>
            <div className="me-3">{rightItems}</div>
          </ul>
        </div>
      </nav>
    </header>
  );
};
