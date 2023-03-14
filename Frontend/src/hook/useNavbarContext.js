import React, { useContext } from 'react';
import { NavbarAuthContext } from '../context/NavbarContext';

const useNavbarContext = () => {
  return useContext(NavbarAuthContext);
}

export default useNavbarContext
