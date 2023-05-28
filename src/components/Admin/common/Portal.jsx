import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children, selector }) => {
  const [element, setElement] = useState(null);
  useEffect(() => {
    setElement(document.querySelector(selector));
  }, [selector]);
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
