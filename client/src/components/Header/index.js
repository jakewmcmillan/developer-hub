import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../utils/auth';

const Header = () => {
    return (<header className="bg-primary text-light mb-4 py-3 flex-row align-center">
    <div className="container flex-row justify-space-between-lg justify-center align-center">
      <h1 className="m-0">Developer Hub</h1>
      <p className="m-0">All-in-One Platform for Online Documentation.</p>
    </div>
  </header>)
  };


  export default Header;



  