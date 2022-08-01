import { Link, useLocation } from "react-router-dom";
import { TabIndicator } from "./decorations/TabIndicator";
import "./components.scss";
import { createRef, useEffect, useState } from "react";
import variables from "../site.scss";

export const Header = ({ brand, rightItems, items }) => {
  const location = useLocation();
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorColor, setIndicatorColor] = useState();
  const refs = items.map(() => createRef());

  useEffect(() => {
    const selectedRef = refs.find(
      (ref) => ref.current.pathname === location.pathname
    );
    const item = items.find((item) => item.to === location.pathname);
    const rect = selectedRef?.current.getBoundingClientRect();
    setIndicatorX(rect.x);
    setIndicatorWidth(rect.width);
    setIndicatorColor(item.textColor);
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
                <Link
                  key={item.text}
                  className={`nav-link me-4`}
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
              ))}
            </div>
            <div className="w-100"></div>
            <div className="me-3">{rightItems}</div>
          </ul>
        </div>
        <TabIndicator
          x={indicatorX}
          width={indicatorWidth}
          backgroundColor={indicatorColor}
        />
      </nav>
    </header>
  );
};
