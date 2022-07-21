import connection from '../db-config.js';
import { ResultSetHeader } from 'mysql2';
import IGenre from '../interfaces/IGenre';

const getAllGenres = async (sortBy = ''): Promise<IGenre[]> => {
  let sql = 'SELECT * FROM genres';
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IGenre[]>(sql);
  return results[0];
};

const getGenreById = async (idGenre: number): Promise<IGenre> => {
  const [results] = await connection
    .promise()
    .query<IGenre[]>('SELECT * FROM genres WHERE id = ?', [idGenre]);
  return results[0];
};

const addGenre = async (genre: IGenre): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO genres (name) VALUES (?)',
      [
        genre.name
      ]
    );
  return results[0].insertId;
};

const updateGenre = async (
  idGenre: number,
  genre: IGenre
): Promise<boolean> => {
  let sql = 'UPDATE genres SET ';
  const sqlValues: Array<string | number> = [];

  if (genre.name) {
    sql += 'name = ? ';
    sqlValues.push(genre.name);
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idGenre);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

const deleteGenre = async (idGenre: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM genres WHERE id = ?', [idGenre]);
  return results[0].affectedRows === 1;
};



export {
  getAllGenres,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre,
};