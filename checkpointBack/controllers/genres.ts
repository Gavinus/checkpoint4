import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as Genre from '../models/genre';
import IGenre from '../interfaces/IGenre';
import { ErrorHandler } from '../helpers/errors';
import { formatSortString } from '../helpers/functions';
import Joi from 'joi';

///////////// GENRES ///////////
// validates input
const validateGenre = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(50).presence(required),
    id: Joi.number().optional(), 
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// checks if an genre exists before update or delete
const genreExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idGenre } = req.params;
  try {
    const genreExists = await Genre.getGenreById(Number(idGenre));
    if (!genreExists) {
      next(new ErrorHandler(404, `This genre doesn't exists`));
    } else {
      next();
    }
  } catch (err) {
    next();
  }
}) as RequestHandler;


// returns all genres
const getAllGenres = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const genres = await Genre.getAllGenres(formatSortString(sortBy));
    res.setHeader(
      'Content-Range',
      `genres : 0-${genres.length}/${genres.length + 1}`
    );
    res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// get genre by id
const getOneGenre = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idGenre } = req.params;
    const genre = await Genre.getGenreById(Number(idGenre));
    genre ? res.status(200).json(genre) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;



const addGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genreId = await Genre.addGenre(req.body as IGenre);
    if (genreId) {
      res.status(201).json({ id: genreId, ...req.body });
    } else {
      throw new ErrorHandler(500, `Genre cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

const updateGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idGenre } = req.params;
    const genreUpdated = await Genre.updateGenre(
      Number(idGenre),
      req.body as IGenre
    );
    if (genreUpdated) {
      const genre = await Genre.getGenreById(Number(idGenre));
      res.status(200).send(genre); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Genre cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// delete genre by id
const deleteGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idGenre } = req.params;
    const genre = await Genre.getGenreById(Number(idGenre));
    const genreDeleted = await Genre.deleteGenre(Number(idGenre));
    if (genreDeleted) {
      res.status(200).send(genre); 
    } else {
      throw new ErrorHandler(500, `This genre cannot be deleted`);
    }
  } catch (err) {
    next(err);
  } 
};

export default {
    validateGenre,
  genreExists,
  getAllGenres,
  getOneGenre,
  deleteGenre,
  addGenre,
  updateGenre,
};