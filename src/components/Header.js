import { Link } from "react-router-dom";

export const Header = ({ brand, leftItems, rightItems }) => {
  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom box-shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {brand}
          </Link>
          <ul className="navbar-nav flex-grow-1 list-group-horizontal">
            <div className="ms-3">{leftItems}</div>
            <div className="w-100"></div>
            <div className="me-3">{rightItems}</div>
          </ul>
        </div>
      </nav>
    </header>
  );
};
