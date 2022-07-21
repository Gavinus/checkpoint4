import express from 'express';
import { handleError } from './helpers/errors';
import setupRoutes from './router';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// à faire des requetes axios
const corsOptions: cors.CorsOptions = {
  // for cookies
  credentials: true,
  // must-have for frontend to communicate with API
  origin: ['http://localhost:3001','http://localhost:3000' ],
};

// middleware cors
app.use(cors(corsOptions));


//middleware pour lire le body
app.use(express.json());


setupRoutes(app);

// A mettre à la fin pour gèrer les erreurs qui sortiront des routes
app.use(handleError);

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`server is listening on ${port}`);
  /* eslint-enable no-console */
});
