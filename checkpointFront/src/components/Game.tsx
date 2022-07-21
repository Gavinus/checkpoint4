import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IGame from '../interfaces/IGame';
import IGenre from '../interfaces/IGenre';

const Games = () => {
  const [showGames, setShowGames] = useState<IGame[]>([]);
  const [showGenres, setShowGenres] = useState<IGenre[]>([]);
  const [filteredGame, setFilteredGame] = useState<string>('');
  const [titleGame, setTitleGame] = useState<string>('');

  useEffect(() => {
    const getGames = async () => {
      // indispensable quand on veut utiliser async/await dans un useEffect
      let url: string = 'http://localhost:3001/api/games';
      try {
        const { data } = await axios.get<IGame[]>(url);
        setShowGames(data);
      } catch (err) {
        console.error(err);
      }
    };
    getGames();

    const getGenres = async () => {
      // indispensable quand on veut utiliser async/await dans un useEffect
      let url: string = 'http://localhost:3001/api/genres';
      try {
        const { data } = await axios.get<IGenre[]>(url);
        setShowGenres(data);
      } catch (err) {
        console.error(err);
      }
    };
    getGenres();
  }, []);
  return (
    <>
      <div className="gamesContainer">
        <h1>Jeux Steam</h1>
        <div className="gamesContainer__list">
          <p>List des Jeux</p>
          {/* Affiche tout mes jeux */}
          {showGames &&
            showGames
              .filter((game) =>
                filteredGame ? game.idGenre === parseInt(filteredGame) : game,
              )
              .filter((game) =>
                titleGame
                  ? game.title.toLowerCase().includes(titleGame.toLowerCase())
                  : game,
              )
              .map((game, index) => (
                <div key={index} className="gamesContainer__list__resumGame">
                  <p>{`Titre : ${game.title}`}</p>
                  <p>{`Genre : ${
                    showGenres
                      .filter((genre) => genre.id === game.idGenre)
                      .map((genre) => genre.name)[0]
                  }`}</p>
                  <p>{`Note : ${game.rating}`}</p>
                </div>
              ))}
        </div>
        <div className="gamesContainer__filter">
          <div className="gamesContainer__filter__genre">
            {/* Filter par genre */}
            <label htmlFor="gamesfilter">
              Filtre par genre:
              <select
                name="games"
                id="gamesFilter"
                onChange={(e) => setFilteredGame(e.target.value)}>
                <option value=""></option>
                {showGenres &&
                  showGenres.map((genre, index) => (
                    <option key={index} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
              </select>
              {/* Afficher par rapport a la value  */}
              <form action="">
                <label htmlFor="title">
                  <input
                    id="title"
                    type="text"
                    onChange={(e) => setTitleGame(e.target.value)}
                    value={titleGame}
                  />
                </label>
              </form>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
