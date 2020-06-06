import React from 'react';
import { FiLogIn} from 'react-icons/fi'
import { Link } from 'react-router-dom';
//import { Container } from './styles';

import './Home.css';

import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>

        <main>
          <h1>Your leavings collection marketplace.</h1>
          <p>We help people find collection points efficiently.</p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register a collection point</strong>
          </Link>
        </main>
      </div>
    </div>
  )
};

export default Home