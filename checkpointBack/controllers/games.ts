import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as Game from '../models/game';
import IGame from '../interfaces/IGame';
import { ErrorHandler } from '../helpers/errors';
import { formatSortString } from '../helpers/functions';
import Joi from 'joi';

///////////// GAMES ///////////
// validates input
const validateGame = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    title: Joi.string().max(50).presence(required),
    idGenre: Joi.number().presence(required),
    adultOnly: Joi.bool().optional().allow(null),
    rating: Joi.number().max(10).presence(required),
    id: Joi.number().optional(),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// checks if an game exists before update or delete
const gameExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idGame } = req.params;
  try {
    const gameExists = await Game.getGameById(Number(idGame));
    if (!gameExists) {
      next(new ErrorHandler(404, `This game doesn't exists`));
    } else {
      next();
    }
  } catch (err) {
    next();
  }
}) as RequestHandler;


// returns all games
const getAllGames = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const games = await Game.getAllGames(formatSortString(sortBy));
    res.setHeader(
      'Content-Range',
      `games : 0-${games.length}/${games.length + 1}`
    );
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// get game by id
const getOneGame = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idGame } = req.params;
    const game = await Game.getGameById(Number(idGame));
    game ? res.status(200).json(game) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;



const addGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameId = await Game.addGame(req.body as IGame);
    if (gameId) {
      res.status(201).json({ id: gameId, ...req.body });
    } else {
      throw new ErrorHandler(500, `Game cannot be created`);
    }
  } catch (err) {
    next(err);
  }
};

const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idGame } = req.params;
    const gameUpdated = await Game.updateGame(
      Number(idGame),
      req.body as IGame
    );
    if (gameUpdated) {
      const game = await Game.getGameById(Number(idGame));
      res.status(200).send(game); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Game cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// delete game by id
const deleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idGame } = req.params;
    const game = await Game.getGameById(Number(idGame));
    const gameDeleted = await Game.deleteGame(Number(idGame));
    if (gameDeleted) {
      res.status(200).send(game); 
    } else {
      throw new ErrorHandler(500, `This game cannot be deleted`);
    }
  } catch (err) {
    next(err);
  } 
};

export default {
  validateGame,
  gameExists,
  getAllGames,
  getOneGame,
  deleteGame,
  addGame,
  updateGame,
};
