import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeContainer__title">
        <h1>Bienvenue sur le Checkpoint 4 de la Wild Code School</h1>
      </div>
      <div className="homeContainer__desc">
        <p>Nous devions créer une api Front et Back de notre choix</p>
        <p>
          J`&apos;`ai donc choisi de le faire sur mes jeux steam afin de les répertorier
        </p>
      </div>
      <Link to="/games">
        <button className="homeContainer__enter">Entrer</button>
      </Link>
    </div>
  );
};

export default Home;
