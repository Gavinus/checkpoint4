import connection from '../db-config.js';
import { ResultSetHeader } from 'mysql2';
import IGame from '../interfaces/IGame';

const getAllGames = async (sortBy = ''): Promise<IGame[]> => {
  let sql = 'SELECT * FROM games';
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IGame[]>(sql);
  return results[0];
};

const getGameById = async (idGame: number): Promise<IGame> => {
  const [results] = await connection
    .promise()
    .query<IGame[]>('SELECT * FROM games WHERE id = ?', [idGame]);
  return results[0];
};


const addGame = async (game: IGame): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO games (title, idGenre, adultOnly, rating) VALUES (?, ?, ?, ?)',
      [
        game.title,
        game.idGenre,
        game.adultOnly,
        game.rating,
      ]
    );
  return results[0].insertId;
};

const updateGame = async (
  idGame: number,
  game: IGame
): Promise<boolean> => {
  let sql = 'UPDATE games SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (game.title) {
    sql += 'title = ? ';
    sqlValues.push(game.title);
    oneValue = true;
  }
  if (game.idGenre) {
    sql += oneValue ? ', idGenre = ? ' : ' idGenre = ? ';
    sqlValues.push(game.idGenre);
    oneValue = true;
  }
  if (game.adultOnly) {
    sql += oneValue ? ', adultOnly = ? ' : ' adultOnly = ? ';
    sqlValues.push(game.adultOnly);
    oneValue = true;
  }
  if (game.rating) {
    sql += oneValue ? ', rating = ? ' : ' rating = ? ';
    sqlValues.push(game.rating);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idGame);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

const deleteGame = async (idGame: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM games WHERE id = ?', [idGame]);
  return results[0].affectedRows === 1;
};



export {
  getAllGames,
  getGameById,
  addGame,
  updateGame,
  deleteGame,
};
