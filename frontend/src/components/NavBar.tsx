import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-white">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-emot-primary">
          EMOT
          <div className="text-xs text-gray-500">Earn Money From Trash</div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/tentang" className="text-gray-700 hover:text-emot-primary">
          Tentang
        </Link>
        <Link to="/layanan" className="text-gray-700 hover:text-emot-primary">
          Layanan
        </Link>
        <Link to="/cara-kerja" className="text-gray-700 hover:text-emot-primary">
          Cara Kerja
        </Link>
        <Link to="/login">
          <Button variant="primary">
            Masuk
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;