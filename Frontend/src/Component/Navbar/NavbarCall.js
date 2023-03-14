import React from 'react';
import useAuth from "../../hook/useAuth";
import Navbar from './Navbar';
import NavbarLogin from './Navbar2';
import useNavbarContext from '../../hook/useNavbarContext';


const NavbarCall = (props) => {
    const {user} = useAuth();

    const {position} = props

  return (
    <div>
        {user
         ? <NavbarLogin position={position} />
         : <Navbar position={position} />
        }
    </div>
  );
};

const NavbarOn = () => {
  const {isNavbarOn, navbarPosition} = useNavbarContext();

return (
    <div>
        {isNavbarOn === true
        ? <NavbarCall position={navbarPosition} />
        : <></>
        }
    </div>
  );
};

export default NavbarOn;
