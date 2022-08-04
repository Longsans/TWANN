import { Link, useLocation } from "react-router-dom";
import { TabIndicator } from "./decorations/TabIndicator";
import "./components.scss";
import { createRef, useEffect, useState } from "react";
import variables from "../site.scss";

export const Header = ({ brand, rightItems, items }) => {
  const location = useLocation();
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const refs = items.map(() => createRef());

  useEffect(() => {
    const selectedRef = refs.find(
      (ref) => ref.current.pathname === location.pathname
    );
    const rect = selectedRef?.current.getBoundingClientRect();
    setIndicatorWidth(rect.width);
  }, [location]);

  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom box-shadow pb-0">
        <div className="container-fluid mb-1">
          <Link className="navbar-brand ff-mono" to="/">
            {brand}
          </Link>
          <ul className="navbar-nav flex-grow-1 list-group-horizontal">
            <div className="w-sm"></div>
            <div className="d-flex align-items-center flex-shrink-0">
              {items.map((item, index) => (
                <li key={item.text} className="me-4">
                  <Link
                    className="nav-link"
                    style={{
                      color:
                        location.pathname === item.to
                          ? item.textColor
                          : variables.black,
                    }}
                    to={item.to}
                    ref={refs[index]}
                  >
                    {item.text}
                  </Link>
                  {item.to === location.pathname && (
                    <TabIndicator
                      width={indicatorWidth}
                      backgroundColor={item.textColor}
                    />
                  )}
                </li>
              ))}
            </div>
            <div className="w-100"></div>
            <div className="me-3">{rightItems}</div>
          </ul>
        </div>
      </nav>
    </header>
  );
};
