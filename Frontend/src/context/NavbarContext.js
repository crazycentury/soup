import { createContext, React, useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

const success = ["/purchasesuccess", /\/verification\/.+/];
const fixedNavbarPaths = ['/invoice', "/admin/payment-method", "/admin/user", /^\/detailinvoice\/\d+$/]

const NavbarAuthContext = createContext();

const NavbarContext = (props) => {
    const { children } = props;
    const [isNavbarOn, setIsNavbarOn] = useState(true);
    const [navbarPosition, setNavbarPosition] = useState("static")

    const location = useLocation();

    const value = {isNavbarOn, navbarPosition};

    useEffect(() => {
        if(success.some((item) => location.pathname.match(item))){
            setIsNavbarOn(false);
        }else{
            setIsNavbarOn(true);
        }

    }, [location.pathname]);

    useEffect(() => {
      if (fixedNavbarPaths.some((path) => location.pathname.match(path))) {
        setNavbarPosition("fixed")
      } else {
        setNavbarPosition("static")
      }
    }, [location.pathname])

  return (
    <NavbarAuthContext.Provider value={value}>{children}</NavbarAuthContext.Provider>
  )
}
export {NavbarAuthContext};
export default NavbarContext;
