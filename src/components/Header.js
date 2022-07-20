export const Header = ({ children }) => {
  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom box-shadow">
        <div className="container-fluid">
          <a className="navbar-brand">This web app needs a name</a>
          <ul className="navbar-nav flex-grow-1 list-group-horizontal">
            {children}
          </ul>
        </div>
      </nav>
    </header>
  );
};
