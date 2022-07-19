export const Header = ({ children }) => {
  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom box-shadow">
        <div className="container-fluid">
          <a className="navbar-brand">This web needs a name</a>
          <ul className="navbar-nav flex-grow-1 list-group-horizontal">
            {children.map((e) => (
              <li className="nav-item text-start list-group-item border-0 py-0">
                <a className="nav-link text-primary" href={e.link}>
                  {e.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
