
// on importe le controller games
import gamesController from './controllers/games';
import genresController from './controllers/genres';
import { Express } from 'express';

const setupRoutes = (server: Express) => {
  // GAMES
  // get games
  server.get('/api/games', gamesController.getAllGames);
  // get game by id
  server.get('/api/games/:idGame', gamesController.getOneGame);
 // add a game
  server.post(
    '/api/games/',
    gamesController.validateGame,
    gamesController.addGame
  );
  // delete game by id
  server.delete(
    '/api/games/:idGame',
    gamesController.gameExists,
    gamesController.deleteGame
  );
 
  // put game, checks if a game exists and updates it
  server.put(
    '/api/games/:idGenre',
     gamesController.validateGame,
    gamesController.gameExists,
    gamesController.updateGame
  );

    // GENRES
  // get genres
  server.get('/api/genres', genresController.getAllGenres);
  // get genre by id
  server.get('/api/genres/:idGenre', genresController.getOneGenre);
 // add a genre
  server.post(
    '/api/genres/',
    genresController.validateGenre,
    genresController.addGenre
  );
  // delete genre by id
  server.delete(
    '/api/genres/:idGenre',
    genresController.genreExists,
    genresController.deleteGenre
  );
  // put genre, checks if a game exists and updates it
  server.put(
    '/api/genres/:idGenre',
    genresController.validateGenre,
    genresController.genreExists,
    genresController.updateGenre
  );

};

export default setupRoutes;
